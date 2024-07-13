import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import sidebarReducer from './slices/sidebarSlice';

export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        auth: authReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, unknown, Action>