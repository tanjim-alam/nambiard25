"use client"
import { login } from '@/redux/slices/authSlice'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

function LoginPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    function handleOnChange(e) {
        const { name, value } = e.target;
        setLoginData((prev) => ({
            ...prev,
            [name]: value
        }))
    };

    async function handleOnSubmit(e) {
        e.preventDefault();
        // console.log(loginData)
        try {
            const res = await dispatch(login(loginData));
            // console.log(res)
            if (res?.payload.success) {
                router.push("/admin")
            }
        } catch (error) {
            throw new Error(error.message)
            // console.log(error)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="flex w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
                <div className="hidden md:flex items-center justify-center w-1/2 bg-gray-100 ">
                    <div className="relative">
                        <img src="/signin-banner.svg" alt="Computer Illustration" className="w-full h-full" />
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-8 bg-white">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Welcome To YOUR APP</h2>

                    <form action="" onSubmit={handleOnSubmit}>
                        <div className="mb-4 mt-3">
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-tl-md rounded-bl-md focus:outline-none focus:border-primary"
                                placeholder="Email"
                                name='email'
                                value={loginData.email}
                                onChange={handleOnChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                                placeholder="Password"
                                name='password'
                                value={loginData.password}
                                onChange={handleOnChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-2 rounded-md hover:bg-red-600 transition duration-300">Login</button>
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-gray-600 border w-full"></p>
                        <Link href={"/register"} className="w-full mt-4 bg-white text-gray-900 border border-gray-300 py-2 rounded-md flex items-center justify-center hover:bg-gray-100 transition duration-300">
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage