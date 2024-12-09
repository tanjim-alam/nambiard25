import React from 'react'
import PrivateRoute from '@/components/PrivateRoute'
import AddBlogPage from './AddBlogPage'

function page() {
    return (
        <PrivateRoute roles={["admin"]}>
            <AddBlogPage />
        </PrivateRoute>
    )
}

export default page