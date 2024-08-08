import { useEffect, useState } from 'react';
import { Command } from '../ui/command';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, Home, LogOut, Settings, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ModeToggle } from '../mode-toggle';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleSidebar } from '../../store/slices/sidebarSlice';
import { MenuItemType } from './types'
import menuData from './menuData.json'
import MenuItem from './MenuItem';

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);

  useEffect(() => {
    // Set the menu items directly from the JSON data
    setMenuItems(menuData);
  }, []);

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

          {menuItems && menuItems.map((item: MenuItemType, key) => {
            return (
              <MenuItem
                key={key}
                item={item}
                openMenu={openMenu}
                handleMenuClick={handleMenuClick}
                handleToogleSidebar={handleToogleSidebar}
              />
            )
          })}
        </Command>
        {/* <div className="mt-auto">
          <button
            onClick={() => {
              // Handle logout logic
              navigate('/auth/signin');
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
          >
            <LogOut className="w-5 h-5 inline-block mr-3" /> Logout!!
          </button>
        </div> */}
      </nav>
    </div>
  );
};

export default Sidebar;
