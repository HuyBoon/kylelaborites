import Link from "next/link";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

interface AuthLinksProps {
	status: "authenticated" | "unauthenticated" | "loading";
	userName?: string;
	isAdmin: boolean;
}

const AuthLinks = ({ status, userName, isAdmin }: AuthLinksProps) => {
	return (
		<div className="auth-links absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-light rounded-lg shadow-lg border border-gray-200 z-10 ">
			{status === "authenticated" ? (
				<>
					<Link
						href={isAdmin ? "/admin/dashboard" : "/"}
						className="block text-center px-2 py-1 font-blod text-gray-800 dark:text-light hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 text-sm md:text-base"
					>
						Hi, {isAdmin ? `${userName}` : userName ? userName : "User"}
					</Link>

					<div
						onClick={() => signOut({ callbackUrl: "/" })}
						className="flex items-center justify-center px-1 py-1 cursor-pointer font-bold text-gray-800 dark:text-light hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 text-sm md:text-base"
					>
						<h4>LogOut</h4>
						<LogOut className="ml-2 w-5 h-5" />
					</div>
				</>
			) : (
				<Link
					href="/login"
					className="block text-center p-1 font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 transition duration-200 text-sm md:text-base"
				>
					Login
				</Link>
			)}
		</div>
	);
};

export default AuthLinks;
