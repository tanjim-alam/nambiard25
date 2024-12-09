import React from 'react'
import PrivateRoute from '@/components/PrivateRoute'
import BlogsPage from './BlogsPage'

function page() {
    return (
        <PrivateRoute roles={["admin"]}>
            <BlogsPage />
        </PrivateRoute>
    )
}

export default page