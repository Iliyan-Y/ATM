import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { createApiGateway } from "./apiGateway";
import { testLambda } from "./lambda/testNode";
import {
	AuthorizationType,
	LambdaIntegration,
	MethodOptions,
	Resource,
} from "aws-cdk-lib/aws-apigateway";
import CognitoConstruct from "./Cognito";
import { IFunction } from "aws-cdk-lib/aws-lambda";

export class AtmStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const cognito = new CognitoConstruct(this, "this-cognito-user-pool-dev");
		const api = createApiGateway(this, "dev");
		const authProps = {
			authorizer: cognito.authorizer,
			authorizationType: AuthorizationType.COGNITO,
			// aws.cognito.signin.user.admin -> allow cognito auth token;
			// openid -> allow SSO auth token
			// https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-app-idp-settings.html
			authorizationScopes: ["aws.cognito.signin.user.admin"],
		};

		//// ENDPOINTS ////
		const testFn = testLambda(this);
		const testEndpoint = api.root.addResource("test");
		testEndpoint.addMethod("POST", new LambdaIntegration(testFn), authProps);
	}
}
//
