// pages/api/auth/login.js
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
    await connectToDatabase();

    const { email, password } = await request.json();

    if (!email || !password) {
        return NextResponse.json({ success: false, error: "Both fields are required" }, { status: 401 });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ success: false, error: "User not registered" }, { status: 404 });
        }

        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return NextResponse.json({ success: false, error: "Incorrect Password" }, { status: 402 });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "4h" });
        if (!token) {
            return NextResponse.json({ success: false, error: "Something went wrong" });
        }
        return NextResponse.json({ success: true, data: { user, token } }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
