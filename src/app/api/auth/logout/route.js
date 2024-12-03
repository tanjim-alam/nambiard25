import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectToDatabase()
    try {
        const token = request.headers.get('authorization');
        if (!token) {
            return NextResponse.json({ success: false }, { status: 403 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }

        user.token = null;
        await user.save();

        return NextResponse.json({ success: true, message: "Logged out successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
    }
}