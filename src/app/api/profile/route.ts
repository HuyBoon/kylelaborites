import { authOptions } from "@/libs/authOptions";
import { connectToDatabase } from "@/libs/connectToDatabase";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface UserType {
    email: string;
    name: string;
    admin: boolean;
    superAdmin: boolean;
}


export async function GET(req: NextRequest) {
    await connectToDatabase();

    // Authenticate session
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    // Fetch user
    const user = await User.findOne({ email: session.user.email }).lean() as UserType | null;
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Respond with user info
    return NextResponse.json({
        email: user.email,
        name: user.name,
        admin: user.admin,
        superAdmin: user.superAdmin,
    });
}
