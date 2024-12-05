import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { username: null, isAuthenticated: false },
    reducers: {
        loginSuccess: (state, action) => {
            state.username = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.store = null;
            state.isAuthenticated = false;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
