import { Outlet } from 'react-router-dom'
import Sidebar from '../components/navigation/Sidebar'
import { Menu } from 'lucide-react'
import { useAppDispatch } from '../store/hooks'
import { toggleSidebar } from '../store/slices/sidebarSlice'

const MainLayout = () => {
    const dispatch = useAppDispatch()

    const handleToogleSidebar = () => {
        dispatch(toggleSidebar())
    }

    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-grow p-0 sm:px-2 md:ml-64 relative">
                <button
                    className="block md:hidden px-4 py-2 mb-4 text-white rounded absolute top-4 right-4"
                    // onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    onClick={handleToogleSidebar}
                >
                    <Menu className="w-5 h-5" />
                </button>
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout