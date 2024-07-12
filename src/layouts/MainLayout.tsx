import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/navigation/Sidebar'
import { Menu } from 'lucide-react'

const MainLayout = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-grow p-6 md:ml-64">
                <button
                    className="block md:hidden px-4 py-2 mb-4 bg-gray-800 text-white rounded"
                    // onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <Menu className="w-5 h-5" />
                </button>
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout