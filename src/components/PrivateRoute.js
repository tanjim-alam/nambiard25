"use client"
import { getProfile } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const PrivateRoute = ({ children, roles = [] }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const token = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('token')) : null;

    const { role, isAuthenticated } = useSelector((state) => state.auth);

    async function fetchProfile() {
        try {
            const res = await dispatch(getProfile(token));
            if (res?.error) {
                localStorage.removeItem("token");
                router.push('/login');
            }
        } catch (error) {
            throw new Error(error.message)
            // console.log("Error fetching profile:", error.message);
        }
    }
    useEffect(() => {
        if (token) {
            fetchProfile();
        } else {
            router.push('/login');
        }
    }, [token, dispatch, router]);

    useEffect(() => {
        if (isAuthenticated && roles.length > 0 && !roles.includes(role)) {
            router.push('/403');
        }
    }, [isAuthenticated, role, roles, router]);

    if (!isAuthenticated || (roles.length > 0 && !roles.includes(role))) {
        return null; // You can replace this with a loading spinner or a fallback component if needed
    }

    return children;
};

export default PrivateRoute;
