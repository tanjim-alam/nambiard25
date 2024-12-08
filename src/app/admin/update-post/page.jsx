import React from 'react'
import UpdatePostPage from './UpdatePostPage'
import PrivateRoute from '@/components/PrivateRoute'

function page() {
    return (
        <PrivateRoute roles={["admin"]}>
            <UpdatePostPage />
        </PrivateRoute>
    )
}

export default page