"use client"
import { getPost } from '@/redux/slices/postSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function HomePage() {
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
        <div>
            <h1>Hello</h1>
            <div dangerouslySetInnerHTML={{ __html: post?.content }} />
        </div>
    )
}

export default HomePage