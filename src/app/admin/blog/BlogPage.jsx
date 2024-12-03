"use client"
import DashBoard from '@/app/dashboard/Dashboard'
// import QuillEditor from '@/components/QuillEditor';
import { addPost, getPost, updatePost } from '@/redux/slices/postSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function BlogPage() {
    const dispatch = useDispatch();
    const { post } = useSelector((state) => state.post);
    // console.log(post);

    useEffect(() => {
        async function fetchPost() {
            try {
                const res = await dispatch(getPost());
                // console.log(res);
            } catch (error) {
                throw new Error(error.message)
                // console.log(error);
            }
        }
        fetchPost();
    }, []);

    const [postData, setPostData] = useState({
        projectName: "",
        projectType: "",
        noOfUnits: "",
        projectStatus: "",
        builder: "",
        totalLandArea: "",
        sizeRange: "",
        unitVariants: "",
        possessionTime: "",
        towersAndBlocks: "",
        reraNo: "",
        about: "",
        content: "",
        featureImage: null
    });

    useEffect(() => {
        if (post) {
            setPostData({
                projectName: post.projectName,
                projectType: post.projectType,
                noOfUnits: post.noOfUnits,
                projectStatus: post.projectStatus,
                builder: post.builder,
                totalLandArea: post.totalLandArea,
                sizeRange: post.sizeRange,
                unitVariants: post.unitVariants,
                possessionTime: post.possessionTime,
                towersAndBlocks: post.towersAndBlocks,
                reraNo: post.reraNo,
                about: post.about,
                content: post.content,
                featureImage: post.featureImage,
            });
        }
    }, [post]);

    const handleSubmit = async () => {
        const formData = new FormData();
        for (const key in postData) {
            formData.append(key, postData[key]);
        }

        try {
            const res = await dispatch(updatePost(formData));
            // console.log("Update response:", res);
        } catch (error) {
            throw new Error(error.message)
            // console.error("Error submitting form:", error);
        }
    };
    return (
        <DashBoard>
            <div>BlogPage
                <button onClick={handleSubmit}>update</button>
            </div>
            {/* <QuillEditor /> */}
        </DashBoard>
    )
}

export default BlogPage