import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";
import { Architecture, Runtime } from "aws-cdk-lib/aws-lambda";
import { Duration } from "aws-cdk-lib";

export function testLambda(scope: Construct) {
	return new NodejsFunction(scope, `test-function-ATM`, {
		functionName: `test-function-ATM`,
		description: "Function to test the stack",
		entry: join(__dirname, "../../src/testFunction/index.ts"),
		handler: "main",
		bundling: {
			externalModules: ["aws-sdk"],
		},
		environment: {
			TEST_ENV_VAR: "test",
		},
		runtime: Runtime.NODEJS_LATEST,
		architecture: Architecture.ARM_64,
		timeout: Duration.seconds(30),
	});
}
