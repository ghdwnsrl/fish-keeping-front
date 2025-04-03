import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { username: null, isAuthenticated: false, isAdmin: false },
    reducers: {
        loginSuccess: (state, action) => {
            state.username = action.payload;
            state.isAuthenticated = true;
            state.isAdmin = false;
        },
        logout: (state) => {
            state.store = null;
            state.isAuthenticated = false;
            state.isAdmin = false;
            state.username = null;
        },
        loginAdminSuccess: (state) => {
            state.isAdmin = true;
        }
    },
});

export const { loginSuccess, logout , loginAdminSuccess} = authSlice.actions;
export default authSlice.reducer;
