import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="flex w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
                <div className="hidden md:flex items-center justify-center w-1/2 bg-gray-100 ">
                    <div className="relative">
                        {/* <div className="absolute top-0 left-0  bg-white rounded-full flex items-center justify-center">
                            <span className="text-xl font-semibold text-gray-800">9:41</span>
                        </div> */}
                        <img src="/signin-banner.svg" alt="Computer Illustration" className="w-full h-full" />
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-8 bg-white">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome To YOUR APP</h2>
                    <div className="mb-4">
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            placeholder="Name"
                        />
                    </div>
                    <div className="mb-4 flex">
                        <input
                            type="text"
                            className="w-[70%] px-3 py-2 border border-gray-300 rounded-tl-md rounded-bl-md focus:outline-none focus:border-primary"
                            placeholder="Email"
                        />
                        <button className=' w-[30%] bg-primary text-white py-2 rounded-tr-md rounded-br-md hover:bg-red-600 transition duration-300'>Get OTP</button>
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                            placeholder="OTP"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                            placeholder="Password"
                        />
                    </div>
                    <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-red-600 transition duration-300">Register</button>
                    <div className="mt-4 text-center">
                        <p className="text-gray-600 border w-full"></p>
                        <Link
                            href={"/login"}
                            className="w-full mt-4 bg-white text-gray-900 border border-gray-300 py-2 rounded-md flex items-center justify-center hover:bg-gray-100 transition duration-300">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage