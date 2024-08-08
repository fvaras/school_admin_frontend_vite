import { Home, User, Settings, LogOut, Icon, ChevronDown, ChevronRight } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom'
import { MenuItemType, SubItem } from './types';

// Mapping of icon strings to Lucide icons
const iconMap: Record<string, typeof Icon> = {
    'fa-home': Home,
    'fa-user': User,
    'fa-chalkboard-teacher': User, // Change this to the correct icon if available
    'fa-user-graduate': User, // Change this to the correct icon if available
    'fa-users': User,
    'fa-clipboard-list': User, // Change this to the correct icon if available
    'fa-book': User, // Change this to the correct icon if available
    'fa-calendar-alt': User, // Change this to the correct icon if available
    'fa-calendar-check': User, // Change this to the correct icon if available
    'fa-book-open': User, // Change this to the correct icon if available
    'fa-cog': Settings,
    'fa-sign-out-alt': LogOut,
};

interface IProps {
    item: MenuItemType
    openMenu: any
    handleToogleSidebar: () => void
    handleMenuClick: (menu: any) => void
}

const MenuItem = ({ item, openMenu, handleToogleSidebar, handleMenuClick }: IProps) => {

    const { id, name, link, icon, subItems } = item
    // const IconComponent = iconMap[menuItem.icon] || User; // Default to User if icon not found
    const IconComponent = iconMap[icon] || User; // Default to User if icon not found

    if (link)
        return (
            <Link to="/auth/signin" onClick={handleToogleSidebar} className="block w-full text-left px-4 py-2 hover:bg-gray-700">
                {/* <Link to={link} onClick={() => { }} className="block w-full text-left px-4 py-2 hover:bg-gray-700"> */}
                {/* @ts-ignore */}
                <IconComponent className='w-5 h-5 inline-block mr-3' /> {name}
            </Link>
        )

    return (
        <>
            <div>
                <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                    onClick={() => handleMenuClick(id)}
                // onClick={() => () => { }}
                >
                    {/* @ts-ignore */}
                    <IconComponent className='w-5 h-5 inline-block mr-3' /> {name}
                    {/* {openMenu === 'user' ? <ChevronDown className="w-5 h-5 inline-block ml-3" /> : <ChevronRight className="w-5 h-5 inline-block ml-3" />} */}
                    {openMenu === id ? <ChevronDown className="w-5 h-5 inline-block ml-3" /> : <ChevronRight className="w-5 h-5 inline-block ml-3" />}
                </button>
                {openMenu === id && (
                    <div className="block w-full text-left px-8">
                        {subItems?.map((item: SubItem, key) => (
                            <Link
                                key={key}
                                to={item.link}
                                onClick={handleToogleSidebar}
                                className="block w-full px-4 py-2 hover:bg-gray-700">
                                {item.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default MenuItem