"use client";

import { signIn, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/AppContext";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginInProgress, setLoginInProgress] = useState(false);
	const [error, setError] = useState(""); // Error state for user feedback
	const router = useRouter();

	const { profileFetched, status } = useUser();

	useEffect(() => {
		if (status === "authenticated") {
			router.push("/");
		}
	}, [status, router]);

	if (status === "loading") {
		return <div>Loading...</div>;
	}

	if (status === "authenticated") {
		return null;
	}

	async function handleFormSubmit(ev: React.FormEvent<HTMLFormElement>) {
		ev.preventDefault();
		setLoginInProgress(true);
		setError("");

		try {
			const result = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});

			if (result?.error) {
				setError("Invalid email or password. Please check your credentials.");
				setLoginInProgress(false);
				return;
			}

			const session = await getSession();
			if (session) {
				const isAdmin = session.user?.admin;

				if (isAdmin) {
					router.push("/admin/dashboard");
				} else {
					router.push("/");
				}
			} else {
				setError("Failed to retrieve session. Please try again.");
			}
		} catch (err) {
			setError("An unexpected error occurred. Please try again later.");
			console.error(err);
		} finally {
			setLoginInProgress(false);
		}
	}

	return (
		<section className="m-8">
			<h1 className="text-center text-4xl mb-4">Login</h1>
			{error && <p className="text-center text-red-500 mb-4">{error}</p>}
			<form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
				<label className="block mb-2" htmlFor="email">
					Email
				</label>
				<input
					id="email"
					type="email"
					name="email"
					placeholder="Email"
					value={email}
					disabled={loginInProgress}
					onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
						setEmail(ev.target.value)
					}
					className="mb-4 p-2 border border-gray-300 w-full"
					required
				/>
				<label className="block mb-2" htmlFor="password">
					Password
				</label>
				<input
					id="password"
					type="password"
					name="password"
					placeholder="Password"
					value={password}
					disabled={loginInProgress}
					onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
						setPassword(ev.target.value)
					}
					className="mb-4 p-2 border border-gray-300 w-full"
					required
					autoComplete="off"
				/>
				<button
					disabled={loginInProgress}
					type="submit"
					className={`${
						loginInProgress ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
					} text-white font-bold py-2 px-4 w-full rounded`}
				>
					{loginInProgress ? "Logging in..." : "Login"}
				</button>
			</form>
		</section>
	);
};

export default LoginPage;
