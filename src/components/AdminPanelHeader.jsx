"use client";
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, logout } from '@/redux/slices/authSlice';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function AdminPanelHeader() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const router = useRouter();
    const dispatch = useDispatch();
    const token = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('token')) : null;
    // console.log("token", token)
    const { user } = useSelector((state) => state.auth);
    // console.log(user);

    async function fetchProfile() {
        await dispatch(getProfile(token))
    }
    useEffect(() => {
        if (token) {
            fetchProfile
        }
    }, [token]);

    async function handleLogout() {
        await dispatch(logout(token));
        localStorage.removeItem("token");
        router.push("/login")
    }
    return (
        <>
            <div className='bg-black static top-0 z-50'>
                <div className='flex justify-between items-center py-2 pl-2 pr-4 m-auto text-white'>
                    <div className='flex justify-center gap-4 items-center'>
                        <IconButton>
                            <MenuIcon className='text-white' />
                        </IconButton>
                        <div className=' bg-[#8b919ea3] border-white p-2 rounded-sm'>
                            <SearchIcon />
                            <input type="text" placeholder='Search...' className='bg-transparent border-none outline-none' />
                        </div>
                    </div>
                    <div>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {/* {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                    </MenuItem>
                                ))} */}

                                <MenuItem onClick={handleCloseUserMenu}
                                >
                                    <Typography sx={{ textAlign: 'center' }}>Profile</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}
                                >
                                    <Typography sx={{ textAlign: 'center' }}>Setting</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}
                                >
                                    <Typography sx={{ textAlign: 'center' }} onClick={handleLogout}>Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </div>
                </div>

            </div>
        </>
    );
}

export default AdminPanelHeader;
