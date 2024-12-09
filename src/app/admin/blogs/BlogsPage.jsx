"use client"
import DashBoard from '@/app/dashboard/Dashboard'
import { getAllBlogs } from '@/redux/slices/blogSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { formatDate } from '@/utils/formateDate';
import Link from 'next/link';

function BlogsPage() {
    const dispatch = useDispatch();
    const { blogs } = useSelector((state) => state?.blog);
    useEffect(() => {
        async function fetchBlogs() {
            try {
                const res = await dispatch(getAllBlogs());
            } catch (error) {
            }
        };
        fetchBlogs();
    }, []);
    return (
        <DashBoard>
            <div>
                <div className='flex justify-end'>
                    <Link href="/admin/add-blog" className='p-2 bg-green-500 text-white rounded-md'>Add Blog</Link>
                </div>
                <div className='mt-3'>
                    {
                        blogs?.map((blog, i) => (
                            <div key={i}>
                                <div className='flex justify-between items-center text-black border-2 border-gray-300 p-2'
                                // style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px" }}
                                >
                                    <img
                                        className='w-[70px]'
                                        src={blog?.featureImage} alt="featureImage" />
                                    <h5>{blog?.title}</h5>
                                    <p>{formatDate(blog?.createdAt)}</p>
                                    <div className='flex gap-3'>
                                        <Link
                                            href={`/admin/update-blog/${blog?._id}`}
                                            className='py-1 px-2 rounded-md text-xl text-white bg-green-500'
                                        ><FaEdit /></Link>
                                        <button className='bg-primary py-1 px-2 rounded-md text-xl text-white '><MdDelete /></button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </DashBoard>
    )
}

export default BlogsPage