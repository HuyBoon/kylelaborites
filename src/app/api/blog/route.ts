import { NextResponse } from "next/server";
import { Blog } from "@/models/Blog";
import { connectToDatabase } from "@/libs/connectToDatabase";

export async function GET(req: Request) {
    await connectToDatabase();

    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const tags = searchParams.get("tags")?.split(",") || []; // Tách tags bởi dấu phẩy

        const skip = (page - 1) * limit;

        // Tạo điều kiện lọc theo tags
        const filter = tags.length > 0 ? { tags: { $in: tags } } : {};

        // Lấy danh sách blogs với phân trang
        const blogs = await Blog.find(filter)
            .select("_id title slug tags thumbnail description")
            .skip(skip)
            .sort({ createdAt: -1 })
            .limit(limit);

        // Tính tổng số bài viết phù hợp với bộ lọc
        const totalBlogs = await Blog.countDocuments(filter);

        return NextResponse.json(
            {
                success: true,
                blogs,
                totalBlogs,
                currentPage: page,
                totalPages: Math.ceil(totalBlogs / limit),
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error", details: (error as Error).message },
            { status: 500 }
        );
    }
}
