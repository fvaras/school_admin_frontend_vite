import { useState } from 'react';
import { Command } from '../ui/command';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, Home, LogOut, Settings, User } from 'lucide-react';
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
            <nav className={`h-full text-white dark:bg-gray-900 flex flex-col ${isOpen ? 'block' : 'hidden'} md:block`}>
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
                            <User className="w-5 h-5 inline-block mr-3" /> Users
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
                    <div>
                        <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                            onClick={() => handleMenuClick('teachers')}
                        >
                            <User className="w-5 h-5 inline-block mr-3" /> Teachers
                            {openMenu === 'teachers' ? <ChevronDown className="w-5 h-5 inline-block ml-3" /> : <ChevronRight className="w-5 h-5 inline-block ml-3" />}
                        </button>
                        {openMenu === 'teachers' && (
                            <div className="block w-full text-left px-8">
                                <Link to="/admin/teachers/all-teachers" onClick={handleToogleSidebar} className="block w-full px-4 py-2 hover:bg-gray-700">
                                    All Teachers
                                </Link>
                                <Link to="/admin/teachers/add-teacher" onClick={handleToogleSidebar} className="block w-full px-4 py-2 hover:bg-gray-700">
                                    Add Teacher
                                </Link>
                            </div>
                        )}
                    </div>
                    <div>
                        <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                            onClick={() => handleMenuClick('students')}
                        >
                            <User className="w-5 h-5 inline-block mr-3" /> Students
                            {openMenu === 'students' ? <ChevronDown className="w-5 h-5 inline-block ml-3" /> : <ChevronRight className="w-5 h-5 inline-block ml-3" />}
                        </button>
                        {openMenu === 'students' && (
                            <div className="block w-full text-left px-8">
                                <Link to="/admin/students/all-students" onClick={handleToogleSidebar} className="block w-full px-4 py-2 hover:bg-gray-700">
                                    All Students
                                </Link>
                                <Link to="/admin/students/add-student" onClick={handleToogleSidebar} className="block w-full px-4 py-2 hover:bg-gray-700">
                                    Add Student
                                </Link>
                            </div>
                        )}
                    </div>
                    <div>
                        <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                            onClick={() => handleMenuClick('guardians')}
                        >
                            <User className="w-5 h-5 inline-block mr-3" /> Guardians
                            {openMenu === 'guardians' ? <ChevronDown className="w-5 h-5 inline-block ml-3" /> : <ChevronRight className="w-5 h-5 inline-block ml-3" />}
                        </button>
                        {openMenu === 'guardians' && (
                            <div className="block w-full text-left px-8">
                                <Link to="/admin/guardians/all-guardians" onClick={handleToogleSidebar} className="block w-full px-4 py-2 hover:bg-gray-700">
                                    All Guardians
                                </Link>
                                <Link to="/admin/guardians/add-guardian" onClick={handleToogleSidebar} className="block w-full px-4 py-2 hover:bg-gray-700">
                                    Add Guardian
                                </Link>
                            </div>
                        )}
                    </div>
                    <div>
                        <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                            onClick={() => handleMenuClick('grades')}
                        >
                            <User className="w-5 h-5 inline-block mr-3" /> Grades
                            {openMenu === 'grades' ? <ChevronDown className="w-5 h-5 inline-block ml-3" /> : <ChevronRight className="w-5 h-5 inline-block ml-3" />}
                        </button>
                        {openMenu === 'grades' && (
                            <div className="block w-full text-left px-8">
                                <Link to="/admin/grades/all-grades" onClick={handleToogleSidebar} className="block w-full px-4 py-2 hover:bg-gray-700">
                                    All Grades
                                </Link>
                                <Link to="/admin/grades/add-grade" onClick={handleToogleSidebar} className="block w-full px-4 py-2 hover:bg-gray-700">
                                    Add Grade
                                </Link>
                            </div>
                        )}
                    </div>
                    <div>
                        <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                            onClick={() => handleMenuClick('subjects')}
                        >
                            <User className="w-5 h-5 inline-block mr-3" /> Subjects
                            {openMenu === 'subjects' ? <ChevronDown className="w-5 h-5 inline-block ml-3" /> : <ChevronRight className="w-5 h-5 inline-block ml-3" />}
                        </button>
                        {openMenu === 'subjects' && (
                            <div className="block w-full text-left px-8">
                                <Link to="/admin/subjects/all-subjects" onClick={handleToogleSidebar} className="block w-full px-4 py-2 hover:bg-gray-700">
                                    All Subjects
                                </Link>
                                <Link to="/admin/subjects/add-subject" onClick={handleToogleSidebar} className="block w-full px-4 py-2 hover:bg-gray-700">
                                    Add Subject
                                </Link>
                            </div>
                        )}
                    </div>
                    <div>
                        <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                            onClick={() => handleMenuClick('events')}
                        >
                            <User className="w-5 h-5 inline-block mr-3" /> Events
                            {openMenu === 'events' ? <ChevronDown className="w-5 h-5 inline-block ml-3" /> : <ChevronRight className="w-5 h-5 inline-block ml-3" />}
                        </button>
                        {openMenu === 'events' && (
                            <div className="block w-full text-left px-8">
                                <Link to="/admin/events/all-events" onClick={handleToogleSidebar} className="block w-full px-4 py-2 hover:bg-gray-700">
                                    All Events
                                </Link>
                                <Link to="/admin/events/add-event" onClick={handleToogleSidebar} className="block w-full px-4 py-2 hover:bg-gray-700">
                                    Add Event
                                </Link>
                                <Link to="/admin/events/calendar" onClick={handleToogleSidebar} className="block w-full px-4 py-2 hover:bg-gray-700">
                                    General Calendar
                                </Link>
                            </div>
                        )}
                    </div>


                    {/* TEACHER ROUTES */}
                    <div>
                        <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                            onClick={() => handleMenuClick('plannings')}
                        >
                            <User className="w-5 h-5 inline-block mr-3" /> Plannings
                            {openMenu === 'plannings' ? <ChevronDown className="w-5 h-5 inline-block ml-3" /> : <ChevronRight className="w-5 h-5 inline-block ml-3" />}
                        </button>
                        {openMenu === 'plannings' && (
                            <div className="block w-full text-left px-8">
                                <Link to="/admin/plannings/all-plannings" onClick={handleToogleSidebar} className="block w-full px-4 py-2 hover:bg-gray-700">
                                    All Plannings
                                </Link>
                                <Link to="/admin/plannings/add-planning" onClick={handleToogleSidebar} className="block w-full px-4 py-2 hover:bg-gray-700">
                                    Add Planning
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
