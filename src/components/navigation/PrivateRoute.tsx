// PrivateRoute.tsx
import { useAppSelector } from '@/store/hooks'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

interface PrivateRouteProps {
    children: React.ReactElement
    allowedProfiles: string[]
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedProfiles }) => {
    const { user } = useAppSelector((state) => state.auth);

    if (!allowedProfiles.includes(user?.profileId!)) {
        return <Navigate to="/auth/signin" replace />
    }

    return children
}

export default PrivateRoute;
