import { NextResponse } from "next/server";
import { Product } from "@/models/Product";
import { connectToDatabase } from "@/libs/connectToDatabase";

export async function GET(req: Request) {
  await connectToDatabase();
  try {
    // Lấy query parameters từ request
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    const products = await Product.find()
      .select('_id name slug category thumbnail images price discount isFeatured')
      .skip(skip) // Bỏ qua các sản phẩm đã tính
      .sort({ createdAt: -1 }) // Sắp xếp bài mới nhất trước (desc)
      .limit(limit); // Lấy số sản phẩm giới hạn

    const totalProducts = await Product.countDocuments();

    return NextResponse.json(
      {
        success: true,
        products,
        totalProducts,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
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


