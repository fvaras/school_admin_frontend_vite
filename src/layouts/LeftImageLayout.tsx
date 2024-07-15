import { Outlet } from 'react-router-dom'

const LeftImageLayout = () => {
    return (
        <div className="flex h-screen">
            <main className="flex-grow p-6 md:ml-64">
                <Outlet />
            </main>
        </div>
    )
}

export default LeftImageLayout