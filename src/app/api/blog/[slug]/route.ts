import { NextResponse } from "next/server";
import { Blog } from "@/models/Blog";
import { connectToDatabase } from "@/libs/connectToDatabase";

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
    await connectToDatabase();
    const { slug } = await context.params;


    try {

        const blog = await Blog.findOne({ slug });
        if (!blog) {
            return NextResponse.json({ success: false, message: "Blog post not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, blog }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error', details: (error as Error).message },
            { status: 500 }
        );
    }
}

