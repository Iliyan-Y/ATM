import {
	GetSecretValueCommand,
	SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";

export const getSecretValue = async (secretName: string) => {
	const client = new SecretsManagerClient();
	const response = await client.send(
		new GetSecretValueCommand({
			SecretId: secretName,
		})
	);

	if (response.SecretString) {
		return response.SecretString;
	}

	throw new Error("Secret not found");
};
