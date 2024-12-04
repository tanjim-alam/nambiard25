"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function HomePage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to "/admin" when the component is mounted
        router.push('/admin');
    }, [router]); // Empty dependency array ensures it runs only once after mount

    return null; // Since we are redirecting, you can return null or a loading indicator.
}

export default HomePage;
