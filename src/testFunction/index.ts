import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const main = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	return {
		statusCode: 200,
		body: JSON.stringify({ message: "test", body: event.body }),
	};
	// try {
	// 	// fetch is available with Node.js 18
	// 	const res = await fetch(url);
	// 	return {
	// 		statusCode: res.status,
	// 		body: JSON.stringify({
	// 			message: await res.text(),
	// 		}),
	// 	};
	// } catch (err) {
	// 	console.log(err);
	// 	return {
	// 		statusCode: 500,
	// 		body: JSON.stringify({
	// 			message: "some error happened",
	// 		}),
	// 	};
	// }
};
