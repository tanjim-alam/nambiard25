import {
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineShoppingCart,
    HiOutlineUsers,
    HiOutlineDocumentText,
    HiOutlineAnnotation,
    HiOutlineQuestionMarkCircle,
    HiOutlineCog
} from 'react-icons/hi'
export const adminMenu = [
    {
        id: 1,
        label: 'Dashboard',
        path: '/',
        icon: HiOutlineViewGrid
    },
    {
        id: 2,
        label: 'Posts',
        path: '/admin/posts',
        icon: HiOutlineCube,
    },
    {
        id: 3,
        label: 'Add Post',
        path: '/admin/add-post',
        icon: HiOutlineShoppingCart
    },
    {
        id: 4,
        label: 'Leads',
        path: '/leads',
        icon: HiOutlineUsers
    },
    {
        id: 5,
        label: 'Blogs',
        path: '/blogs',
        icon: HiOutlineDocumentText
    },
    {
        id: 6,
        label: 'Add Blog',
        path: '/add-blog',
        icon: HiOutlineAnnotation
    }
]


export const userMenu = [
    {
        id: 1,
        label: 'Dashboard',
        path: '/',
        icon: HiOutlineViewGrid
    },
    {
        id: 2,
        label: 'Leads',
        path: '/leads/page/1',
        icon: HiOutlineCube,
    },
    {
        id: 3,
        label: 'Employees',
        path: '/employees',
        icon: HiOutlineShoppingCart
    },
    {
        id: 4,
        label: 'Task',
        path: '/task',
        icon: HiOutlineUsers
    },
    {
        id: 5,
        label: 'Reminder',
        path: '/reminder',
        icon: HiOutlineAnnotation
    },
    {
        id: 6,
        label: 'Leave',
        path: '/leave',
        icon: HiOutlineAnnotation
    },
    {
        id: 7,
        label: 'Booked',
        path: '/booked',
        icon: HiOutlineAnnotation
    }
]