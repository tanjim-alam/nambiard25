import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/models/User'; // Ensure you have this model defined correctly

export async function GET(request) {
    const token = request.headers.get('authorization');
    if (!token) {
        return NextResponse.json({ success: false, error: 'Access denied, token missing' }, { status: 403 });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded", decoded)
        const user = await User.findById(decoded.id);

        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }
        // Respond with the user data
        return NextResponse.json({
            success: true,
            message: 'User fetched successfully',
            user,
        }, { status: 200 });

    } catch (error) {
        // Handle token verification or database errors
        console.log("error.message", error.message)
        let errorMessage = 'An error occurred';
        let statusCode = 500;
        console.log("error.name", error.name)
        if (error.name === 'TokenExpiredError') {
            errorMessage = 'Token expired';
            statusCode = 401;
        } else if (error.name === 'JsonWebTokenError') {
            errorMessage = 'Invalid token';
            statusCode = 401;
        } else {
            errorMessage = error.message;
        }

        return NextResponse.json({ success: false, error: errorMessage }, { status: statusCode });
    }
}
