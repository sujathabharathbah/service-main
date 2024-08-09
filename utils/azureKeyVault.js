/**
 * @fileoverview Service for interacting with Azure Key Vault.
 * This file provides functionality to securely retrieve secrets from Azure Key Vault.
 */
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');
const logger = require('../logger');

/**
 * @class AzureKeyVaultService
 * @description Manages interactions with Azure Key Vault for secret retrieval.
 */
class AzureKeyVaultService {
    /**
     * @constructor
     * @description Initializes the AzureKeyVaultService with necessary Azure credentials and configurations.
     */
    constructor() {
        this.credential = new DefaultAzureCredential();
        this.keyVaultName = this.getKeyVaultName();
        this.subscriptionId = process.env.KEYVAULT_SUBSCRIPTION_ID;
        this.url = `https://${this.keyVaultName}.vault.azure.net/`;
        this.resourceGroupName = process.env.RESOURCE_GROUP;
        this.client = new SecretClient(this.url, this.credential);
    }

    /**
     * @private
     * @method getKeyVaultName
     * @description Retrieves the Key Vault name from environment variables.
     * @returns {string} The name of the Azure Key Vault.
     * @throws {Error} If the KEY_VAULT_NAME environment variable is not set.
     */
    getKeyVaultName() {
        const keyVaultName = process.env['KEY_VAULT_NAME'];
        if (!keyVaultName) {
            throw new Error('KEY_VAULT_NAME environment variable is not set');
        }
        return keyVaultName.toLowerCase();
    }

    /**
     * @async
     * @method getSecret
     * @description Retrieves a secret from Azure Key Vault.
     * @param {string} secretName - The name of the secret to retrieve.
     * @returns {Promise<string>} The value of the retrieved secret.
     * @throws {Error} If there's an error retrieving the secret.
     */
    async getSecret(secretName) {
        try {
            const secret = await this.client.getSecret(secretName);
            return secret.value;
        } catch (error) {
            logger.error(
                `azureKeyVault - getSecret() - Error retrieving secret ${secretName}:`,
                error.message
            );
            throw error;
        }
    }
}

module.exports = new AzureKeyVaultService();
