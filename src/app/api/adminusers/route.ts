import { connectToDatabase } from "@/libs/connectToDatabase";
import { User } from "@/models/User";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    await connectToDatabase();

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.admin) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(req.url);
        let page = parseInt(searchParams.get("page") || "1", 10);
        let limit = parseInt(searchParams.get("limit") || "10", 10);

        page = page > 0 ? page : 1;
        limit = limit > 0 ? limit : 10;
        const skip = (page - 1) * limit;

        const users = await User.find({})
            .select("name email admin superAdmin createdAt")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const totalUsers = await User.countDocuments();

        return NextResponse.json(
            {
                success: true,
                users,
                total: totalUsers,
                currentPage: page,
                totalPages: Math.ceil(totalUsers / limit),
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
