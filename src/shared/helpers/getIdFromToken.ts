import { decode } from "jsonwebtoken";

export function getIdFromToken(token: string | undefined): string {
	if (!token) throw "no token";

	const decoded = decode(token);

	if (!decoded) throw "not decoded";

	if (!decoded.sub) throw "no sub";

	return decoded.sub as string;
}
