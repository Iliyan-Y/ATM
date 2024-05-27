export interface User {
	uuid: string;
	name: string;
	attributes: UserAttributes;
}

export interface UserAttributes {
	role: string;
	domain: string;
}
