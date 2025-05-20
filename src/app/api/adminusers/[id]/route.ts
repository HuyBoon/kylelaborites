// api/adminusers/[id]/route.ts
import { connectToDatabase } from "@/libs/connectToDatabase";
import { User } from "@/models/User";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    await connectToDatabase(); // Kết nối database

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.admin) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 }); // Chỉ admin mới được quyền xóa
    }

    const { id } = await context.params;

    try {
        // Kiểm tra nếu người dùng hiện tại là super admin
        const isSuperAdmin = token.email === "kyleskincare0401@gmail.com";

        // Không cho phép admin xóa chính mình
        if (token.sub === id) {
            return NextResponse.json({ success: false, message: "You cannot delete yourself" }, { status: 403 });
        }

        // Lấy thông tin người dùng bị xóa
        const userToDelete = await User.findById(id);
        if (!userToDelete) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        // Nếu người dùng cần xóa là admin
        if (userToDelete.admin) {
            // Chỉ super admin mới được xóa admin khác
            if (!isSuperAdmin) {
                return NextResponse.json({ success: false, message: "Only super admin can delete other admins" }, { status: 403 });
            }

            // Không cho phép xóa super admin khác (có thể mở rộng để nhiều super admin)
            if (userToDelete.superAdmin) {
                return NextResponse.json({ success: false, message: "Cannot delete another super admin" }, { status: 403 });
            }
        }

        // Xóa người dùng
        const result = await User.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Internal Server Error', details: (error as Error).message },
            { status: 500 }
        );
    }
}
