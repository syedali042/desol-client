import { createSlice } from "@reduxjs/toolkit"

const userReducer = createSlice({
    name: "user",
    initialState: {
        name: null,
        email: null,
    },
    reducers: {
        setUserData(state, { payload: { name, email } }) {
            state.name = name
            state.email = email
        },
    },
})

export const getUserData = state => state.user

export const { setUserData } = userReducer.actions
export default userReducer.reducer
