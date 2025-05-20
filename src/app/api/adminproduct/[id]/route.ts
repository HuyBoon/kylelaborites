import { NextResponse } from "next/server";
import { Product } from "@/models/Product";
import { connectToDatabase } from "@/libs/connectToDatabase";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

// PUT: Update a product by ID (admin use)
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.admin) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const { id } = await context.params;
    const productData = await req.json();

    try {
        await connectToDatabase();
        const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });

        if (!updatedProduct) {
            return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, product: updatedProduct }, { status: 200 });
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error", details: (error as Error).message },
            { status: 500 }
        );
    }
}

// GET: Fetch product by ID (admin use)
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.admin) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    try {
        await connectToDatabase();
        const product = await Product.findById(id);

        if (!product) {
            return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, product }, { status: 200 });
    } catch (error) {
        console.error("Error fetching product:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error", details: (error as Error).message },
            { status: 500 }
        );
    }
}

// DELETE: Delete product by ID (admin use)
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.admin) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    try {
        await connectToDatabase();
        const result = await Product.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Product deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error", details: (error as Error).message },
            { status: 500 }
        );
    }
}
