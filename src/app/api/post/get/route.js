import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET(request) {
    await connectToDatabase()
    try {
        const post = await Post.findOne({});
        if (!post) {
            return NextResponse.json({ success: false, error: "Post Not Found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, post }, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}