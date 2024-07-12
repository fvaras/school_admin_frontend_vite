import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div>
            <div>sidebar</div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout