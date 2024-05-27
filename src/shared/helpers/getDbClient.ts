import { MongoClient } from "mongodb";
import { getSecretValue } from "./getSecretValue";

export async function getDbClient() {
	const secretName = process.env.MONGODB_CONNECTION_STRING;

	if (!secretName) throw "no secret name";

	const connectionString = await getSecretValue(secretName);

	if (!connectionString) throw "no connection string";

	return new MongoClient(connectionString);
}
