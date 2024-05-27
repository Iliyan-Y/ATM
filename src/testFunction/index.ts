import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { getDbClient } from "../shared/helpers/getDbClient";
import { getIdFromToken } from "../shared/helpers/getIdFromToken";
import { User } from "../shared/Entity/User";

export const main = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	console.log(event);

	const userId = getIdFromToken(event.headers.Authorization);

	const client = await getDbClient();

	try {
		const db = await client.db("galactic_empire");
		await db.collection<User>("user").createIndex({ id: 1 }, { unique: true });
		const collection = await db.collection<User>("user");
		await collection.insertOne({
			uuid: userId,
			name: "test",
			attributes: {
				role: "admin",
				domain: "ATM",
			},
		});
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
