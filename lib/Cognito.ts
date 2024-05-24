import { Construct } from "constructs";
import {
	AccountRecovery,
	StringAttribute,
	UserPool,
	UserPoolClient,
	UserPoolClientIdentityProvider,
	UserPoolDomain,
} from "aws-cdk-lib/aws-cognito";
import { Duration, Tags } from "aws-cdk-lib";
import { CognitoUserPoolsAuthorizer } from "aws-cdk-lib/aws-apigateway";

export default class CognitoConstruct extends Construct {
	private readonly webAppClient: UserPoolClient;

	public readonly userPool: UserPool;
	public readonly authorizer: CognitoUserPoolsAuthorizer;

	constructor(scope: Construct, id: string) {
		super(scope, id);

		this.userPool = this.createCognitoUserPool();

		this.webAppClient = this.createWebAppClient();

		const userPoolDomain = new UserPoolDomain(this, "atm-user-domain", {
			userPool: this.userPool,
			cognitoDomain: {
				domainPrefix: `atm-internal-dev`,
			},
		});

		this.authorizer = new CognitoUserPoolsAuthorizer(this, `Authorizer-dev`, {
			cognitoUserPools: [this.userPool],
			authorizerName: `internal-app-authorizer-dev`,
		});

		Tags.of(userPoolDomain).add("env", "dev");
		Tags.of(this.webAppClient).add("env", "dev");
		Tags.of(this.userPool).add("env", "dev");
	}

	private createCognitoUserPool(): UserPool {
		const userPool = new UserPool(this, `ATM-Internal-cognito-dev`, {
			userPoolName: `ATM-Internal-dev`,
			selfSignUpEnabled: false,
			signInCaseSensitive: false,
			accountRecovery: AccountRecovery.EMAIL_ONLY,
			signInAliases: { email: true },
			standardAttributes: {
				email: { required: true, mutable: true },
			},
			customAttributes: {
				assignedRoles: new StringAttribute({ mutable: true }),
				domain: new StringAttribute({ mutable: true }),
			},
			passwordPolicy: {
				minLength: 8,
				requireDigits: false,
				requireLowercase: false,
				requireSymbols: false,
				requireUppercase: false,
				tempPasswordValidity: Duration.days(30),
			},
		});

		return userPool;
	}

	private createWebAppClient() {
		const client = new UserPoolClient(this, "atm-webapp-user-pool-client", {
			userPool: this.userPool,
			userPoolClientName: `webapp-client-dev`,
			authFlows: {
				userPassword: true,
				userSrp: true,
				adminUserPassword: true,
			},
			supportedIdentityProviders: [UserPoolClientIdentityProvider.COGNITO],
		});
		return client;
	}
}
