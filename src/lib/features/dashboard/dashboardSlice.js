import {createSlice} from '@reduxjs/toolkit';

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        itemsDashboard: {},
        optionSelected: null,
        mediaQuery: {
            value: "1280px",
            type: "Desktop"
        },
        options: {
            keepOptions: false
        }
    },
    reducers: {
        itemsDashboard: (state, action) => {
            state.itemsDashboard = action.payload;
        },
        optionSelected: (state, action) => {
            state.optionSelected = action.payload;
        },
        mediaQuery: (state, action) => {
            state.mediaQuery = action.payload;
        },
        options: (state, action) => {
            state.options = action.payload;
        }
    },
})

export const { itemsDashboard, optionSelected, mediaQuery, options} = dashboardSlice.actions;