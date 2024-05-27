import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { ObjectId } from "mongodb";
import { getDbClient } from "../shared/helpers/getDbClient";

// TODO convert to interfaces
class User {
	constructor(
		public id: string,
		public name: string,
		public attributes: UserAttributes
	) {}
}

class UserAttributes {
	constructor(public role: string, public domain: string) {}
}

export const main = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	console.log(event);

	const client = await getDbClient();

	try {
		const db = await client.db("galactic_empire");
		const collection = await db.collection("user");
		await collection.insertOne(
			new User(
				"584eb612-f8b0-48c9-855e-6d246461b604",
				"test",
				new UserAttributes("admin", "ATM")
			)
		);
	} catch (e) {
		console.log(e);
		return {
			statusCode: 500,
			body: "Connection error",
		};
	} finally {
		await client.close();
	}

	return {
		statusCode: 200,
		body: JSON.stringify({ message: "test", body: event.body }),
	};
};
