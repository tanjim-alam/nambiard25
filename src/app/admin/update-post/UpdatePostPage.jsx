"use client"; // Ensure this is at the top of the file

import React, { useState, useRef, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import DashBoard from '@/app/dashboard/Dashboard'; // Adjust the import according to your project structure
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, getPost, updatePost } from '@/redux/slices/postSlice';

// Dynamically import JoditEditor and disable SSR
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

function UpdatePostPage() {
    const dispatch = useDispatch();
    const editor1 = useRef(null);
    const editor2 = useRef(null);

    const config1 = useMemo(() => ({
        readonly: false,
        placeholder: 'Start typing...',
        height: 300
    }), []);

    const config2 = useMemo(() => ({
        readonly: false,
        placeholder: 'Start typing...',
        height: 600
    }), []);

    const { post } = useSelector((state) => state.post);

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

    const handleInput = (e) => {
        const { name, value } = e.target;
        setPostData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileInput = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        if (file) {
            setPostData(prev => ({
                ...prev,
                [name]: file
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setPrevImage(reader.result);  // Make sure you have setPrevImage defined
            };
            reader.readAsDataURL(file);
        }
    };

    const [cont, setCont] = useState(null);

    const handleSubmit = async () => {
        const formData = new FormData();

        // Append all fields to formData
        for (const key in postData) {
            if (postData[key] !== post[key]) {
                formData.append(key, postData[key]);
            }
        }
        setCont(postData.content)

        // formData.append("content", cont)

        try {
            const res = await dispatch(updatePost(formData));
            if (res?.payload?.success) {
                alert("Updated");
            }
        } catch (error) {
            alert("Failed to update");
            throw new Error(error.message)
            // console.error("Error submitting form:", error);
        }
    };

    const handleEditorChange = (field, newContent) => {
        // console.log(`Updating ${field}:`, newContent);
        setPostData(prev => ({ ...prev, [field]: newContent }));
    };

    return (
        <DashBoard>
            <div className='flex gap-3'>
                <div className="w-[80%] mx-auto">
                    <div>
                        <input
                            type="text"
                            className="w-full p-2 border-2 border-gray-200"
                            placeholder="Project name..."
                            style={{ boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px" }}
                            name='projectName'
                            value={postData.projectName}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="mt-4 bg-white" style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset" }}>
                        <p className='border-b p-2'>About</p>
                        <JoditEditor
                            ref={editor1}
                            config={config1}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => {
                                console.log("About onBlur newContent:", newContent);
                                handleEditorChange('about', newContent);
                            }}
                            value={postData.about}
                        />
                    </div>
                    <div className="mt-4 bg-white" style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset" }}>
                        <p className='border-b p-2'>Content</p>
                        <JoditEditor
                            ref={editor2}
                            config={config2}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => {
                                console.log("Content onBlur newContent:", newContent);
                                handleEditorChange('content', newContent);
                            }}
                            value={postData.content}
                        />
                    </div>
                </div>
                <div className='w-[20%] flex flex-col gap-4'>
                    {[{ label: "Project Type", name: "projectType" },
                    { label: "No Of Units", name: "noOfUnits" },
                    { label: "Project Status", name: "projectStatus" },
                    { label: "Builder", name: "builder" },
                    { label: "Total Land Area", name: "totalLandArea" },
                    { label: "Size Range", name: "sizeRange" },
                    { label: "Unit Variants", name: "unitVariants" },
                    { label: "Possession Time", name: "possessionTime" },
                    { label: "Towers And Blocks", name: "towersAndBlocks" },
                    { label: "Rera No", name: "reraNo" }]
                        .map(field => (
                            <div className='bg-white' key={field.name}>
                                <TextField
                                    id={`${field.name}-outlined`}
                                    className='w-full'
                                    label={field.label}
                                    variant="outlined"
                                    name={field.name}
                                    value={postData[field.name]}
                                    onChange={handleInput}
                                />
                            </div>
                        ))}
                    <div
                        className='bg-white'
                        style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset" }}
                    >
                        <p className='border-b p-2'>Categories</p>
                        <div className='p-2'>
                            <ul>
                                <li className='flex gap-1 items-center'>
                                    <input type="checkbox" id="category-news" name="category-news" value="News" />
                                    News
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div
                        className='bg-white'
                        style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset" }}
                    >
                        <p className='border-b p-2'>Featured image</p>
                        <div className='p-2'>
                            <input
                                type="file"
                                className='w-full'
                                name='featureImage'
                                onChange={handleFileInput}
                            />
                        </div>
                    </div>
                    <div className='flex justify-between p-2'>
                        <button className='border border-blue-700 py-2 px-3'>Save Draft</button>
                        <button
                            className='bg-blue-700 py-2 px-3 text-white'
                            onClick={handleSubmit}
                        >Publish</button>
                    </div>
                </div>
            </div>
        </DashBoard>
    );
}

export default UpdatePostPage;
