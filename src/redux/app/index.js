import { createSlice } from "@reduxjs/toolkit"

const appReducer = createSlice({
    name: "app",
    initialState: {
        pageTitle: "",
        goBack: false,
    },
    reducers: {
        setPageTitle(state, { payload: { pageTitle } }) {
            state.pageTitle = pageTitle
        },
        setGoBack(state, { payload: { goBackTrigger } }) {
            state.goBack = goBackTrigger
        },
    },
})

export const getPageTitle = state => state.app.pageTitle
export const getGoBack = state => state.app.goBack

export const { setPageTitle, setGoBack } = appReducer.actions
export default appReducer.reducer
