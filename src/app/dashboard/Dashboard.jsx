import AdminPanelHeader from '@/components/AdminPanelHeader'
import Sidebar from '@/components/Sidebar'
import React from 'react'

function DashBoard({ children }) {
    return (
        <div className='bg-neutral-100 h-screen w-screen overflow-hidden flex gap-1'>
            <div className='w-[180px] h-[100vh] bg-black'>
                <Sidebar />
            </div>
            <div className='flex flex-col flex-1 overflow-hidden'>
                <AdminPanelHeader />
                <div className=' overflow-y-scroll p-4'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashBoard