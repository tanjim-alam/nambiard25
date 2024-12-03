import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
    await connectToDatabase();
    const { name, email, password } = await request.json();
    if (!name || !email || !password) {
        return NextResponse.json({ success: false, error: "All fileds are required" }, { status: 403 });
    }
    try {

        const alreadyExist = await User.findOne({ email });
        if (alreadyExist) {
            return NextResponse.json({ success: false, error: "User already exists" }, { status: 409 });
        };
        const newUser = await User({
            name,
            email,
            password
        });

        await newUser.save();
        if (!newUser) {
            throw new Error("Something went wrong");
        }
        return NextResponse.json({
            success: true,
            message: "Register Successfully",
            newUser
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}