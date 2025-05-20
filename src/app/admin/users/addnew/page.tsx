// pages/admin/adduser.tsx (hoặc đường dẫn tương ứng)
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/AppContext"; // Giả sử bạn có AppContext
import AddUser from "@/components/layoutdashboard/AddUser";

const AddUserPage = () => {
	const router = useRouter();
	const { user, isAdmin, isSuperAdmin, profileFetched, status } = useUser();

	useEffect(() => {
		if (status === "authenticated" && profileFetched && !isSuperAdmin) {
			router.push("/dashboard"); // Chỉ super admin mới được phép truy cập
		}
	}, [isSuperAdmin, profileFetched, status, router]);

	if (!profileFetched || status === "loading") {
		return <div>Loading...</div>;
	}

	if (!isSuperAdmin) {
		return null; // Không hiển thị gì nếu không phải super admin
	}

	return (
		<div>
			<AddUser />
		</div>
	);
};

export default AddUserPage;
