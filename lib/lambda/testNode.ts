import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";
import { Architecture, Runtime } from "aws-cdk-lib/aws-lambda";
import { Duration } from "aws-cdk-lib";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";

export function testLambda(scope: Construct) {
	const mongoDbConnection = Secret.fromSecretCompleteArn(
		scope,
		"mongodb-connection-string-cdk-id",
		"arn:aws:secretsmanager:eu-west-2:975049896505:secret:mongodb-connection-string-WEEiXt"
	);

	const testFn = new NodejsFunction(scope, `test-function-ATM`, {
		functionName: `test-function-ATM`,
		description: "Function to test the stack",
		entry: join(__dirname, "../../src/testFunction/index.ts"),
		handler: "main",
		bundling: {
			externalModules: ["aws-sdk"],
		},
		environment: {
			MONGODB_CONNECTION_STRING: mongoDbConnection.secretName,
		},
		runtime: Runtime.NODEJS_LATEST,
		architecture: Architecture.ARM_64,
		timeout: Duration.seconds(30),
	});

	mongoDbConnection.grantRead(testFn);
	return testFn;
}
