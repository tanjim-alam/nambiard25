"use client"; // Ensure this is at the top of the file
import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import DashBoard from '@/app/dashboard/Dashboard'; // Adjust the import according to your project structure
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { addBlog } from '@/redux/slices/blogSlice';
function AddPostPage() {
    const dispatch = useDispatch();
    const editor1 = useRef(null);

    const config1 = useMemo(() => ({
        readonly: false,
        placeholder: 'Start typing...',
        height: 600 // Set the height here (in pixels)
    }), []);

    const [blogData, setblogData] = useState({
        title: "",
        content: "",
        metaDescription: "",
        featureImage: null
    });
    const [prevImag, setPrevImage] = useState(null);
    const [loading, setLoading] = useState(false);
    // ==================

    const handleInput = (e) => {
        const { name, value } = e.target;
        setblogData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileInput = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        if (file) {
            setblogData(prev => ({
                ...prev,
                [name]: file
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setPrevImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("title", blogData.title);
        formData.append("content", blogData.content);
        formData.append("metaDescription", blogData.metaDescription);
        formData.append("featureImage", blogData.featureImage);

        try {
            setLoading(true)
            const res = await dispatch(addBlog(formData));
            if (res?.payload?.success) {
                alert(res?.payload?.message || "Updated");
                setLoading(false)
                setblogData({
                    title: "",
                    content: "",
                    metaDescription: "",
                    featureImage: null
                });
            }
            setLoading(false)
        } catch (error) {
            alert("Failed", error?.message);
            setLoading(false)
        }
    };

    return (
        <DashBoard>
            <div className='flex gap-3'>
                <div className="w-[80%] mx-auto">
                    <div>
                        <input
                            type="text"
                            className="w-full p-2 border-2 border-gray-200"
                            placeholder="Title..."
                            style={{ boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px" }}
                            name='title'
                            value={blogData.title}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="mt-4 bg-white" style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset" }}>
                        <p className='border-b p-2'>Content</p>
                        <JoditEditor
                            ref={editor1}
                            config={config1}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setblogData(prev => ({ ...prev, content: newContent }))}
                            value={blogData.content}
                        />
                    </div>
                    <div className="mt-4 bg-white" style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset" }}>
                        <p className='border-b p-2'>Meta Description</p>
                        <textarea
                            className='w-full p-2 outline-none border'
                            placeholder='Meta Description...'
                            name="metaDescription"
                            value={blogData.metaDescription}
                            onChange={handleInput}
                        ></textarea>
                    </div>
                </div>
                <div className='w-[20%] flex flex-col gap-4'>
                    <div
                        className='bg-white'
                        style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset" }}
                    >
                        <p className='border-b p-2'>Publish</p>
                        <div className='flex justify-between p-2'>
                            <button className='border border-blue-700 py-2 px-3'>Save Draft</button>
                            <button
                                className='bg-blue-700 py-2 px-3 text-white'
                                onClick={handleSubmit}
                            >
                                {loading ? "Publishing" : "Publish"}
                            </button>
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
                        <div className='mt-4'>
                            {
                                prevImag ? (
                                    <div className='p-2'>
                                        <img
                                            className='w-full border-2'
                                            src={prevImag} />
                                    </div>
                                ) :
                                    null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </DashBoard>
    );
}

export default AddPostPage;
