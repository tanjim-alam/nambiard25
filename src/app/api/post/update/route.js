import connectToDatabase from "@/lib/mongodb";
import Post from "@/models/Post";
import uploadOnCloudinary from "@/utils/cloudinary";
import { NextResponse } from "next/server";

export async function PUT(request) {
    try {
        // Connect to the database
        await connectToDatabase();
        // console.log("Database connection established");

        // Parse the incoming form data
        const formData = await request?.formData();
        // console.log("Form data received", formData);

        // Extract form data fields
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
        // console.log("Form data fields extracted");

        // Initialize variable for Cloudinary upload
        let uploadedImageUrl;

        if (featureImage) {
            const bufferData = await featureImage.arrayBuffer();
            const buffer = Buffer.from(bufferData);
            const uploadResult = await uploadOnCloudinary(buffer); // Assuming this function handles uploading to Cloudinary
            uploadedImageUrl = uploadResult.secure_url;
            // console.log("Image uploaded to Cloudinary");
        }

        // Find the existing post (you might want to use an ID from the request or other criteria)
        const post = await Post.findOne({});
        // console.log("Existing post fetched:", post);

        if (!post) {
            // console.log("Post not found");
            return NextResponse.json({ success: false, error: "Post Not Found" }, { status: 404 });
        }

        // Prepare the updated post data
        const updatedPostData = {
            projectName: projectName || post.projectName,
            about: about || post.about,
            projectType: projectType || post.projectType,
            noOfUnits: noOfUnits || post.noOfUnits,
            projectStatus: projectStatus || post.projectStatus,
            builder: builder || post.builder,
            totalLandArea: totalLandArea || post.totalLandArea,
            sizeRange: sizeRange || post.sizeRange,
            unitVariants: unitVariants || post.unitVariants,
            possessionTime: possessionTime || post.possessionTime,
            towersAndBlocks: towersAndBlocks || post.towersAndBlocks,
            reraNo: reraNo || post.reraNo,
            content: content || post.content,
            featureImage: uploadedImageUrl || post.featureImage // Only update featureImage if a new image is uploaded
        };

        // console.log("Updated post data prepared:", uploadedImageUrl);

        // Update the post in the database
        const updatedPost = await Post.findOneAndUpdate({}, updatedPostData, { new: true });
        if (!updatedPost) {
            // console.log("Failed to update the post");
            return NextResponse.json({ success: false, error: "Failed to update" }, { status: 403 });
        }

        // Return the updated post as a response
        // console.log("Post updated successfully:", updatedPost);
        return NextResponse.json({ success: true, updatedPost }, { status: 201 });

    } catch (error) {
        console.error("Error in PUT request:", error.message);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
