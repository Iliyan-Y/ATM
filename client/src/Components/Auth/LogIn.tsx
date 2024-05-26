import { useState } from "react";
import { signIn } from "aws-amplify/auth";

const LogInPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogIn = async () => {
		await signIn({ username: email, password })
			.then((res) => console.log(res))
			.catch((e) => console.log(e));
	};
	return (
		<div>
			<h1>Log In</h1>
			<input
				type="text"
				placeholder="Email"
				onChange={(e) => setEmail(e.target.value)}
				value={email}
			/>
			<input
				type="password"
				placeholder="Password"
				onChange={(e) => setPassword(e.target.value)}
				value={password}
			/>
			<button onClick={handleLogIn}>Log In</button>
		</div>
	);
};

export default LogInPage;
