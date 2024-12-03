import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";
import uploadOnCloudinary from "@/utils/cloudinary";
import { NextResponse } from "next/server";

export const config = {
    api: {
        bodyParser: false
    }
};

export async function POST(request) {
    await connectToDatabase();
    const formData = await request.formData();
    const projectName = formData.get("projectName");
    const about = formData.get("about");
    const projectType = formData.get("projectType");
    const noOfUnits = formData.get("noOfUnits");
    const projectStatus = formData.get("projectStatus");
    const builder = formData.get("builder");
    const totalLandArea = formData.get("totalLandArea");
    const sizeRange = formData.get("sizeRange");
    const unitVariants = formData.get("unitVariants");
    const possessionTime = formData.get("possessionTime");
    const towersAndBlocks = formData.get("towersAndBlocks");
    const reraNo = formData.get("reraNo");
    const content = formData.get("content");
    const featureImage = formData.get("featureImage");
    if (!projectType || !noOfUnits || !content) {
        return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
    }

    if (!featureImage) {
        return NextResponse.json({ success: false, error: "featureImage is required" }, { status: 400 });
    }

    try {
        const bufferData = await featureImage.arrayBuffer();
        const buffer = Buffer.from(bufferData);

        // Upload to Cloudinary
        const result = await uploadOnCloudinary(buffer);
        const post = await Post.create({
            projectName,
            about,
            projectType,
            noOfUnits,
            projectStatus,
            builder,
            totalLandArea,
            sizeRange,
            unitVariants,
            possessionTime,
            towersAndBlocks,
            reraNo,
            content,
            featureImage: result.secure_url
        });

        return NextResponse.json({ success: true, post }, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

}