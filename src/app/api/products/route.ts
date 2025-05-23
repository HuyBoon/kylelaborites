import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/Product";
import { connectToDatabase } from "@/libs/connectToDatabase";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    // Get pagination and filter parameters
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const category = url.searchParams.get("category") || "";
    const isFeatured = url.searchParams.get("isFeatured") || "";
    const skip = (page - 1) * limit;

    // Build query
    const query: { category?: string; isFeatured?: boolean } = {};
    if (category) {
      query.category = category;
    }
    if (isFeatured) {
      query.isFeatured = isFeatured === "true"; // Convert string to boolean
    }

    // Fetch paginated products
    const [products, totalItems] = await Promise.all([
      Product.find(query)
        .lean()
        .select("_id name slug category thumbnail images price discount isFeatured")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }), // Sort by newest first
      Product.countDocuments(query),
    ]);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalItems / limit);

    return NextResponse.json({
      success: true,
      products,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
    });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products." },
      { status: 500 }
    );
  }
}