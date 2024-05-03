import authenticationReducer from './features/authentication/auth-slice.ts'

import {configureStore} from "@reduxjs/toolkit"

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
  }
})

export default store;
export type RootState = ReturnType<typeof store.getState>


