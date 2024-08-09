/**
 * @fileoverview Service for interacting with Azure Communication Services email SDK to send email.
 */

const {
    EmailClient,
    KnownEmailSendStatus,
} = require('@azure/communication-email');
const azureKeyVault = require('../utils/azureKeyVault');
const logger = require('../logger');

/**
 * Sends an email using Azure Communication Services email SDK.
 *
 * @async
 * @function postEmail
 * @param {Object} requestBody - The request body containing email details.
 * @param {string} requestBody.senderAddress - The email address of the sender.
 * @param {string} requestBody.recipientAddress - The email address of the recipient.
 * @param {string} requestBody.meetingLink - The meeting link to be included in the email.
 * @returns {Promise<string>} A message indicating the success of the email send operation.
 * @throws {Error} Throws an error if the email sending process fails.
 */
const postEmail = async (requestBody) => {
    const POLLER_WAIT_TIME = 10;
    let result = '';

    const connectionString =
        process.env['NODE_ENV'] === 'localhost'
            ? process.env['ACS-EMAIL-API-ENDPOINT']
            : await azureKeyVault.getSecret('ACS-EMAIL-API-ENDPOINT');

    const { senderAddress, recipientAddress, meetingLink } = requestBody;

    const emailTemplate = `<html>This is a notification about your upcoming VA Video Connect visit: <br>
    <a href="${meetingLink}">Click Here To Join</a> <br>
    <br>
    If unable to join by video, join by phone (audio only) +1 866-304-9177 <br>
    Or dial +1 866-304-9177, Conference 029598000, PIN 107321 US Toll free <br>
    
    <br>
    If you are new to VA Video Connect you can:<br>
    Test your connection. To test on your mobile device, text 'V' to 83293 or 323-621-3589. Standard text messaging rates may apply.<br>
    Learn more about VA Video Connect.<br>
    For the best experience on a mobile device, please download the VA Video Connect App:<br>  
    For Android on Google Play <br>  
    For Apple iPad and iPhone on the Apple App Store<br> 
    <br>
    Need Help?<br>  
    Please call 1-866-651-3180 to speak with an Office of Connected Care Help Desk (OCCHD) Representative.<br> 
    The OCCHD is available 24 hours a day, 7 days a week. For TTY assistance, dial 711.<br> 
    <br>
    Appointment Instructions:<br> 
    Ensure you are in a private and safe place with good internet connectivity.<br> 
    Please treat your visit as if you were seeing your provider in-person (e.g., dress appropriately,<br> 
    do not drive or use alcohol/other substances or engage in other activities, etc.).<br> 
    Review your care team's guidance for a successful VVC visit.<br> 
    <br>
    Please have the following information available:<br> 
    •	Phone number: How we can reach you by telephone, if the video call drops.<br> 
    •	Address: Your location during the visit.<br> 
    •	Emergency Contact: Name, phone number, and relationship of a person who we can contact in an emergency.<br> 
    
    Group Terms of Engagement:<br>  
    For new group visits, your group leader will ask you to read and accept the Group Telehealth Agreement.<br> 
    •	View the agreement.<br> 
   <br>
    Need to Reschedule?<br>  
    Do not reply to this message. This message is sent from an unmonitored mailbox.<br> 
    For any questions or concerns please contact your VA Facility or VA Clinical Team.<br> 
    If you have received this email in error, please contact Office of Connected Care Help Desk at 1-866-651-3180.</html>`;

    const message = {
        senderAddress: senderAddress,
        recipients: {
            to: [{ address: recipientAddress }],
        },
        content: {
            subject: 'VA Video Connect Appointment',
            html: emailTemplate,
        },
    };

    try {
        // Create a EmailClient object from the ACS communication SDK package with the ACS connection string
        // Use the beginSend method of that Object to send out the message package
        const client = new EmailClient(connectionString);
        const poller = await client.beginSend(message);

        // Check to see if the email object has started sending the message
        if (!poller.getOperationState().isStarted) {
            throw 'Poller was not started.';
        }

        // Email ACS object logic to show the progress of the email being sent
        let timeElapsed = 0;
        while (!poller.isDone()) {
            poller.poll();
            console.log('Email send polling in progress');

            await new Promise((resolve) =>
                setTimeout(resolve, POLLER_WAIT_TIME * 1000)
            );
            timeElapsed += 10;

            if (timeElapsed > 18 * POLLER_WAIT_TIME) {
                throw 'Polling timed out.';
            }
        }

        // If the email was sent then sucess message or throw error
        if (poller.getResult().status === KnownEmailSendStatus.Succeeded) {
            result = `Successfully sent the email (operation id: ${poller.getResult().id})`;
        } else {
            throw poller.getResult().error;
        }
        return result;
    } catch (ex) {
        logger.error(ex);
        handleError(ex);
    }
};

/**
 * Handles errors that occur during HTTP requests.
 * Logs different types of errors and rethrows the error.
 *
 * @function handleError
 * @param {Error} error - The error object caught during the request.
 * @throws {Error} The original error is rethrown after logging.
 */
const handleError = (error) => {
    if (error.response) {
        // Server responds with a status code that falls out of the range of 2xx
        logger.error(
            'Server responds with a status code that falls out of the range of 2xx: ' +
                error
        );
        const { data: err_message, status, headers } = error.response;
        const error_json = {
            err_message,
            status,
            headers,
        };
        logger.error('Response error: ', error_json);
    } else if (error.request) {
        // Request was made but no response received
        logger.error('Request was made but no response received');
        logger.error('Request error: ', error.message);
    } else {
        // Something happened in setting up the request that triggered the error
        logger.error(
            'Something happened in setting up the request that triggered the error'
        );
        logger.error('Request error: ', error.message);
    }
    // Rethrow the error
    throw error;
};

module.exports = { postEmail };
