import { connectToDatabase } from "@/libs/connectToDatabase";
import { Subcriber } from "@/models/Subcriber";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    await connectToDatabase();

    const { id } = await context.params;


    try {
        const result = await Subcriber.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return NextResponse.json({ success: false, message: "Subscriber not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Subscriber deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting subscriber:", error);
        return NextResponse.json({ error: "Failed to delete subscriber" }, { status: 500 });
    }
}
