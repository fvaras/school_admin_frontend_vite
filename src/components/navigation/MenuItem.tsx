import {
    Home,
    User,
    GraduationCap,
    SquareUser,
    SquareUserRound,
    LibraryBig,
    BookOpenCheck,
    CalendarCheck,
    CalendarClock,
    FolderKanban,
    NotebookPen,
    LogOut,
    Icon,
    ChevronDown,
    ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom'
import { MenuItemType, SubItem } from './types';
import { useTranslation } from 'react-i18next';

// Mapping of icon strings to Lucide icons
const iconMap: Record<string, typeof Icon> = {
    'home': Home,
    'user': User, // users
    'graduation-cap': GraduationCap, // teachers
    'square-user': SquareUser, // students
    'square-user-round': SquareUserRound, // guardians
    'library-big': LibraryBig, // grades
    'book-open-check': BookOpenCheck, // subjects
    'calendar-check': CalendarCheck, // events
    'calendar-clock': CalendarClock, // timetable
    'folder-kanban': FolderKanban, // plannings
    'notebook-pen': NotebookPen, // homeworks
    'log-out': LogOut, // Logoout
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

    const { t } = useTranslation();

    if (link)
        return (
            <Link
                to={link}
                className="w-full flex items-center p-2 text-gray-500 transition-colors rounded-md dark:text-light hover:bg-indigo-100 dark:hover:bg-indigo-600"
                onClick={() => handleMenuItemClick(item.id)}>
                {/* @ts-ignore */}
                <IconComponent className='w-5 h-5 inline-block mr-3' />
                <span className="ml-2 text-sm">{t(name)}</span>
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
                    <span className="ml-2 text-sm">{t(name)}</span>
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
                                {/* {item.name} */}
                                {t(item.name)}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default MenuItem