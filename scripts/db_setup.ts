import { getDbClient } from "../src/shared/helpers/getDbClient";

// Create collections
// execute to setup collection rules
// export MONGODB_CONNECTION_STRING=aws-secret-name before executing
// ts-node db_setup.ts
(async () => {
	console.log("Connecting to database...");
	const client = await getDbClient();

	try {
		const db = await client.db("galactic_empire");

		console.log("Creating collections...");
		// Describe collections
		await db.collection("user").createIndex({ uuid: 1 }, { unique: true });
		// add more collections here
	} catch (e) {
		console.log("Error attempting to create collection: ", e);
	} finally {
		console.log("Success: Collection created, closing connection...");
		await client.close();
	}
})();
