import { createSlice } from '@reduxjs/toolkit';

export interface SidebarState {
    isOpen: boolean;
}

const initialState: SidebarState = {
    isOpen: false,
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isOpen = !state.isOpen;
        },
        hideSidebar: (state) => {
            state.isOpen = false;
        },
    },
});

export const { toggleSidebar, hideSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
