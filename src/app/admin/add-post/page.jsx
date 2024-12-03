import React from 'react'
import AddPostPage from './AddPostPage'
import PrivateRoute from '@/components/PrivateRoute'

function page() {
    return (
        <PrivateRoute roles={["admin", "user"]}>
            <AddPostPage />
        </PrivateRoute>
    )
}

export default page