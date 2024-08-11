import { useEffect, useState } from 'react';
import { Command } from '../ui/command';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ModeToggle } from '../mode-toggle';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleSidebar } from '../../store/slices/sidebarSlice';
import { MenuItemType } from './types'
import menuData from './menuData.json'
import MenuItem from './MenuItem';

const Sidebar = () => {
  const [openedMenu, setOpenedMenu] = useState<string>('');
  const [openedMenuItem, setOpenedMenuItem] = useState<string>('');
  // const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);

  const { user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    // Set the menu items directly from the JSON data
    setMenuItems(menuData.filter(p => p.profiles.includes(user?.profileId!) && p.id.toLowerCase() !== 'logout'));
  }, []);

  const dispatch = useAppDispatch()

  const isOpen = useAppSelector((state) => state.sidebar.isOpen);

  const handleMenuClick = (menu: MenuItemType) => {
    setOpenedMenu(openedMenu === menu.id ? '' : menu.id);
  }

  const handleMenuItemClick = (id: string) => {
    setOpenedMenuItem(id)
    dispatch(toggleSidebar())
  };

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
                openedMenu={openedMenu}
                openedMenuItem={openedMenuItem}
                handleMenuClick={handleMenuClick}
                handleMenuItemClick={handleMenuItemClick}
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
