import { itemsDashboard, optionSelected, mediaQuery, options} from "./dashboardSlice";

export const setItemsDashboard = (items) => {
    return async (dispatch) => {
        dispatch(itemsDashboard(items))
    }
}
export const setOptionSelected = (item) => {
    return async (dispatch) => {
        dispatch(optionSelected(item))
    }
}
export const setMediaQuery = (query) => {
    return async (dispatch) => {
        dispatch(mediaQuery(query))
    }
}
export const setOptions = (_options) => {
    return async (dispatch) => {
        dispatch(options(_options))
    }
}
