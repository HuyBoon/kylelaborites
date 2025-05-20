import { connectToDatabase } from "@/libs/connectToDatabase";
import { Subcriber } from "@/models/Subcriber";

export async function POST(req: Request) {
    await connectToDatabase();

    try {
        const body = await req.json();
        const { name, phone, email, message } = body;

        // Validate input
        if (!email) {
            return new Response(
                JSON.stringify({ error: "Email are required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Check if the email already exists
        const existingSubscriber = await Subcriber.findOne({ email });

        if (existingSubscriber) {
            // Update the message if the email exists
            existingSubscriber.message = message || existingSubscriber.message;
            await existingSubscriber.save();

            return new Response(JSON.stringify(existingSubscriber), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Create a new subscriber if the email does not exist
        const newSubscriber = await Subcriber.create({
            name,
            phone,
            email,
            message: message || null,
        });

        return new Response(JSON.stringify(newSubscriber), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error creating or updating subscriber:", error);
        return new Response(
            JSON.stringify({ error: "Failed to create or update subscriber" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

export async function GET(req: Request) {
    await connectToDatabase();
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);

    try {
        // Fetch the total number of subscribers
        const totalSubscribers = await Subcriber.countDocuments();
        const totalPages = Math.ceil(totalSubscribers / limit);

        // Fetch paginated subscribers
        const subscribers = await Subcriber.find({})
            .skip((page - 1) * limit)
            .limit(limit);

        // Return paginated results
        return new Response(
            JSON.stringify({
                subscribers,
                currentPage: page,
                totalPages,
                totalSubscribers,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error fetching subscribers:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch subscribers" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
