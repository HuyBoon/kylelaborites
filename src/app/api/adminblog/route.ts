import { NextResponse } from "next/server";
import { Blog } from "@/models/Blog";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from 'next/server';
import { connectToDatabase } from "@/libs/connectToDatabase";

export async function POST(req: NextRequest) {
    await connectToDatabase();
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.admin) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { title, slug, tags, description, thumbnail, content } = await req.json(); // Lấy dữ liệu từ yêu cầu
        const newBlog = new Blog({ title, slug, tags, description, thumbnail, content }); // Tạo blog mới

        // Lưu blog vào cơ sở dữ liệu
        const savedBlog = await newBlog.save();

        // Trả về blog đã lưu
        return NextResponse.json(
            { success: true, blog: savedBlog },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error", details: (error as Error).message },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    await connectToDatabase(); // Kết nối đến cơ sở dữ liệu

    // Kiểm tra token để xác nhận quyền truy cập
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.admin) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 }); // Trả về 401 nếu không có quyền
    }

    try {
        const { searchParams } = new URL(req.url); // Lấy các tham số tìm kiếm từ URL
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit; // Tính số lượng bỏ qua

        // Fetch blogs với phân trang và sắp xếp theo createdAt (bài mới nhất trước)
        const blogs = await Blog.find()
            .select('_id title slug tags thumbnail description createdAt') // Thêm trường createdAt
            .sort({ createdAt: -1 }) // Sắp xếp bài mới nhất trước (desc)
            .skip(skip) // Bỏ qua số lượng đã tính
            .limit(limit); // Giới hạn số lượng blog trả về

        // Tính tổng số blog
        const totalBlogs = await Blog.countDocuments();

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
            { error: 'Internal Server Error', details: (error as Error).message },
            { status: 500 }
        );
    }
}
