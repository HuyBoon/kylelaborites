import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'; // Import NextRequest
import { Product } from "@/models/Product";
import { getToken } from "next-auth/jwt"; // Import getToken từ next-auth
import { connectToDatabase } from "@/libs/connectToDatabase";
// Helper function for setting CORS headers



// POST: Create a new product
export async function POST(req: NextRequest) {
    await connectToDatabase();

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.admin) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const productData = await req.json();
        const { name, slug, category, price } = productData;

        if (!name || !category || !price || !slug) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newProduct = new Product(productData);
        const savedProduct = await newProduct.save();

        return NextResponse.json({ success: true, product: savedProduct }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error", details: (error as Error).message }, { status: 500 });
    }
}

// GET: Retrieve products with pagination
export async function GET(req: NextRequest) {
    await connectToDatabase();

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.admin) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 400 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);
        const skip = (page - 1) * limit;

        const products = await Product.find()
            .select('_id name slug category thumbnail images price discount isFeatured')
            .skip(skip)
            .sort({ createdAt: -1 })
            .limit(limit);

        const totalProducts = await Product.countDocuments();

        return NextResponse.json({
            success: true,
            products,
            totalProducts,
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error', details: (error as Error).message }, { status: 500 });
    }
}
