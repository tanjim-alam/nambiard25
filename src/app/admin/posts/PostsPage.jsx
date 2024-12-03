"use client"
import DashBoard from '@/app/dashboard/Dashboard'
import { getPost } from '@/redux/slices/postSlice';
import { formatDate } from '@/utils/formateDate';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';


function PostsPage() {
    const dispatch = useDispatch();
    const { post } = useSelector((state) => state.post);
    // console.log(post)
    async function fetchPost() {
        try {
            const res = await dispatch(getPost());
            // console.log(res)
        } catch (error) {
            throw new Error(error.message)
            // console.log(error)
        }
    }

    useEffect(() => {
        fetchPost();
    }, []);
    return (
        <DashBoard>
            <div>
                <div className='flex justify-between items-center text-black border-2 border-gray-300 p-2'
                // style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px" }}
                >
                    <img
                        className='w-[70px]'
                        src={post?.featureImage || "https://res.cloudinary.com/dmz316wxm/image/upload/v1732821572/ythnclldsaixhz4zjamf.webp"} alt="" />
                    <h5>{post?.projectName}</h5>
                    <p>{formatDate(post?.updatedAt)}</p>
                    <div className='flex gap-3'>
                        <Link
                            href={"/admin/update-post"}
                            className='py-1 px-2 rounded-md text-xl text-white bg-green-500'
                        ><FaEdit /></Link>
                        <button className='bg-primary py-1 px-2 rounded-md text-xl text-white '><MdDelete /></button>
                    </div>
                </div>
            </div>
        </DashBoard>
    )
}

export default PostsPage