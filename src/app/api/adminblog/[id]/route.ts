import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import { Blog } from "@/models/Blog";

import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/libs/connectToDatabase";


export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;


    const blogData = await req.json();
    try {
        await connectToDatabase(); // Connect to the database
        const updatedBlog = await Blog.findByIdAndUpdate(
            new ObjectId(id),
            blogData,
            { new: true }
        );

        if (!updatedBlog) {
            return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
        }

        return NextResponse.json(updatedBlog, { status: 200 });
    } catch (error) {
        console.error('Error updating blog post:', error);
        return NextResponse.json({ message: 'Error updating blog post', details: (error as Error).message }, { status: 500 });
    }
}


export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    await connectToDatabase();


    const { id } = await context.params;

    try {
        const blog = await Blog.findById(new ObjectId(id));
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

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    await connectToDatabase();
    const { id } = await context.params;

    try {
        const result = await Blog.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ success: false, message: "Blog post not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Blog post deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Internal Server Error', details: (error as Error).message },
            { status: 500 }
        );
    }
}
