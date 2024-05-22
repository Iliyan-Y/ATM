import { Construct } from "constructs";
import { RestApi, Cors } from "aws-cdk-lib/aws-apigateway";

export function createApiGateway(scope: Construct, env: string): RestApi {
	return new RestApi(scope, `AtmApi-${env}`, {
		restApiName: "ATM-Api",
		deployOptions: {
			stageName: "dev",
		},
		defaultCorsPreflightOptions: {
			allowHeaders: [...Cors.DEFAULT_HEADERS, "x-correlation-id"],
			allowMethods: Cors.ALL_METHODS,
			allowCredentials: false,
			allowOrigins: Cors.ALL_ORIGINS,
		},
	});
}
