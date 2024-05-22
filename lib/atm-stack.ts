import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { createApiGateway } from "./apiGateway";
import { testLambda } from "./lambda/testNode";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AtmStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const api = createApiGateway(this, "dev");
		const testFn = testLambda(this);
		const testHandler = new LambdaIntegration(testFn);
		const testPath = api.root.addResource("test");
		testPath.addMethod("POST", testHandler);
	}
}
