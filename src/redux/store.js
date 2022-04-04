import { configureStore } from "@reduxjs/toolkit"
import appReducer from "./app"
import userReducer from "./user"

const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer
  },
})

export default store
