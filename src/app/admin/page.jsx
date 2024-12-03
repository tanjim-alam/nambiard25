import PrivateRoute from '@/components/PrivateRoute'
import React from 'react'
import AdminPage from './AdminPage'

function page() {
    return (
        <PrivateRoute roles={["admin"]}>
            <AdminPage />
        </PrivateRoute>
    )
}

export default page