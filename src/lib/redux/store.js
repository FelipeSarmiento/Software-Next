import { configureStore } from '@reduxjs/toolkit'
import { dashboardSlice } from "../features/dashboard/dashboardSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            itemsDashboard: dashboardSlice.reducer
        }
    })
}