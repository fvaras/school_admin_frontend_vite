import { Home, User, Settings, LogOut, Icon, ChevronDown, ChevronRight, Calendar, CalendarCheck, CalendarCheck2, CalendarClock, LucideCalendarClock } from 'lucide-react';
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
    'fa-calendar-alt': CalendarClock, // Change this to the correct icon if available
    'fa-calendar-check': CalendarCheck, // Change this to the correct icon if available
    'fa-book-open': User, // Change this to the correct icon if available
    'fa-cog': Settings,
    'fa-sign-out-alt': LogOut,
};

interface IProps {
    item: MenuItemType
    openedMenu: string
    openedMenuItem: string
    handleMenuClick: (menu: MenuItemType) => void
    handleMenuItemClick: (id: string) => void
}

const MenuItem = ({ item, openedMenu, openedMenuItem, handleMenuClick, handleMenuItemClick }: IProps) => {

    const { id, name, link, icon, subItems } = item
    // const IconComponent = iconMap[menuItem.icon] || User; // Default to User if icon not found
    const IconComponent = iconMap[icon] || User; // Default to User if icon not found

    if (link)
        return (
            <Link
                to={link}
                className="w-full flex items-center p-2 text-gray-500 transition-colors rounded-md dark:text-light hover:bg-indigo-100 dark:hover:bg-indigo-600"
                onClick={() => handleMenuItemClick(item.id)}>
                {/* @ts-ignore */}
                <IconComponent className='w-5 h-5 inline-block mr-3' />
                <span className="ml-2 text-sm">{name}</span>
            </Link>
        )

    return (
        <>
            <div>
                <button
                    className={`w-full flex items-center p-2 text-gray-500 transition-colors rounded-md dark:text-light hover:bg-indigo-100 dark:hover:bg-indigo-600 ${openedMenu === id ? 'bg-indigo-100 dark:bg-indigo-600' : ''}`}
                    onClick={() => handleMenuClick(item)}
                >
                    {/* @ts-ignore */}
                    <IconComponent className='w-5 h-5 inline-block mr-3' />
                    <span className="ml-2 text-sm">{name}</span>
                    <span className="ml-auto">
                        {openedMenu === id ? <ChevronDown className="w-5 h-5 inline-block ml-3" /> : <ChevronRight className="w-5 h-5 inline-block ml-3" />}
                    </span>
                </button>
                {openedMenu === id && (
                    <div className="block w-full text-left px-8">
                        {subItems?.map((item: SubItem, key) => (
                            <Link
                                key={key}
                                to={item.link}
                                onClick={() => handleMenuItemClick(item.id)}
                                className={`
                                    block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md dark:hover:text-light hover:text-gray-700
                                    ${openedMenuItem === item.id ? 'text-gray-700 dark:text-light' : ''}
                                `}
                            >
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