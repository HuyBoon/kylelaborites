import { NextRequest, NextResponse } from "next/server";
import { Blog } from "@/models/Blog";
import { connectToDatabase } from "@/libs/connectToDatabase";

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        // Get pagination and filter parameters
        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get("page") || "1", 10);
        const limit = parseInt(url.searchParams.get("limit") || "10", 10);
        const tags = url.searchParams.get("tags")?.split(",") || [];

        const skip = (page - 1) * limit;

        // Build query
        const query: { tags?: { $in: string[] }; status?: string } = {};
        if (tags.length > 0) {
            query.tags = { $in: tags };
        }


        // Fetch paginated blogs
        const [blogs, totalItems] = await Promise.all([
            Blog.find(query)
                .lean()
                .select("_id title slug tags thumbnail description content")
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 }),
            Blog.countDocuments(query),
        ]);

        // Calculate pagination metadata
        const totalPages = Math.ceil(totalItems / limit);

        return NextResponse.json({
            success: true,
            blogs,
            pagination: {
                totalItems,
                totalPages,
                currentPage: page,
                pageSize: limit,
            },
        });
    } catch (error) {
        console.error("GET /api/blogs error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch blogs." },
            { status: 500 }
        );
    }
}