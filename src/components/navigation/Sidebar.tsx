import React, { useEffect, useState } from 'react';
import { Command } from '../ui/command';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, Home, LogOut, Menu, Settings, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ModeToggle } from '../mode-toggle';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleSidebar } from '../../store/slices/sidebarSlice';

const Sidebar = () => {
    const [openMenu, setOpenMenu] = useState(null);
    const navigate = useNavigate();

    const dispatch = useAppDispatch()

    const isOpen = useAppSelector((state) => state.sidebar.isOpen);

    const handleMenuClick = (menu: any) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    const handleToogleSidebar = () => {
        dispatch(toggleSidebar())
    }

    return (
        <div className={`fixed top-0 left-0 z-40 w-64 h-full transition-transform sm:translate-x-0`}>
            <nav className={`h-full bg-gray-800 text-white dark:bg-gray-900 flex flex-col ${isOpen ? 'block' : 'hidden'} md:block`}>
                <div className="px-4 py-6 flex items-center justify-between">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <ModeToggle />
                </div>
                <Command className="flex-grow">
                    <Link to="/auth/signin" onClick={handleToogleSidebar} className="block w-full text-left px-4 py-2 hover:bg-gray-700">
                        <Home className="w-5 h-5 inline-block mr-3" /> Home
                    </Link>
                    <div>
                        <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                            onClick={() => handleMenuClick('user')}
                        >
                            <User className="w-5 h-5 inline-block mr-3" /> User
                            {openMenu === 'user' ? <ChevronDown className="w-5 h-5 inline-block ml-3" /> : <ChevronRight className="w-5 h-5 inline-block ml-3" />}
                        </button>
                        {openMenu === 'user' && (
                            <div className="block w-full text-left px-8">
                                <Link to="/admin/users/all-users" onClick={handleToogleSidebar} className="block w-full px-4 py-2 hover:bg-gray-700">
                                    All Users
                                </Link>
                                <Link to="/admin/users/add-user" onClick={handleToogleSidebar} className="block w-full px-4 py-2 hover:bg-gray-700">
                                    Add User
                                </Link>
                            </div>
                        )}
                    </div>
                    <Link to="/admin/users/all-users" onClick={handleToogleSidebar} className="block w-full text-left px-4 py-2 hover:bg-gray-700">
                        <Settings className="w-5 h-5 inline-block mr-3" /> Settings
                    </Link>
                </Command>
                <div className="mt-auto">
                    <button
                        onClick={() => {
                            // Handle logout logic
                            navigate('/auth/signin');
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                    >
                        <LogOut className="w-5 h-5 inline-block mr-3" /> Logout
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
