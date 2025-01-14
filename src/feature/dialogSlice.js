
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
        title: '',
        content: '',
        redirectPath: ''
    },
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true;
            state.title = action.payload.title;
            state.content = action.payload.content;
            state.redirectPath = action.payload.redirectPath || '';

        },
        closeModal: (state) => {
            state.isOpen = false;
            state.title = '';
            state.content = '';
            state.redirectPath = '';
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
