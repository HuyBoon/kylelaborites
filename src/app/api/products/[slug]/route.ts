import { NextResponse } from "next/server";
import { Product } from "@/models/Product";
import { connectToDatabase } from "@/libs/connectToDatabase";




export async function GET(req: Request, context: { params: Promise<{ slug: string }> }) {
    await connectToDatabase();
    const { slug } = await context.params;
    try {
        // Fetch the product by slug
        const product = await Product.findOne({ slug });
        if (!product) {
            return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, product }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error', details: (error as Error).message },
            { status: 500 }
        );
    }
}

