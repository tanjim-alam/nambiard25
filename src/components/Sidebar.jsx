"use client"
import { adminMenu } from '@/contant/menu';
import Link from 'next/link'
import React, { useState } from 'react'

function Sidebar() {
    const [currBtnId, setCurrBtnId] = useState(1);

    return (
        <div className='bg-black' style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}>
            <div className='p-4'>
                <h3 className='text-white text-center text-2xl font-bold'>LOGO</h3>
                <div className='mt-3'>
                    <ul className='flex flex-col gap-3 '>
                        {
                            adminMenu.map((item, i) => (
                                <li key={i} className={`text-white p-1 text-sm font- ${currBtnId === item.id ? "bg-primary" : "bg-transparent"}`} onClick={() => setCurrBtnId(item.id)}>
                                    <Link href={item.path}
                                        className='flex items-center gap-1'
                                    >
                                        <item.icon />{item.label}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar