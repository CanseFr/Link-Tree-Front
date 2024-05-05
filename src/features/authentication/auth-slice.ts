import {createSlice} from '@reduxjs/toolkit'
import {jwtDecode, JwtPayload} from "jwt-decode";

export interface DecodedToken extends JwtPayload {
  userId: number | undefined;
  role: string | undefined;
}

const initialState: DecodedToken = {
  userId: undefined,
  role: undefined,
}

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setRoleOnLogin(state, action) {
      try {
        const decoded = jwtDecode<DecodedToken>(action.payload);
        state.userId = decoded.userId;
        state.role = decoded.role;
        localStorage.setItem("token", action.payload)
      } catch (err) {
        console.log(err);
      }
    },
    logout(state) {
      localStorage.clear()
      state.role = undefined;
      state.userId = undefined;
    }
  },
})

export const {setRoleOnLogin, logout} = authenticationSlice.actions;
export default authenticationSlice.reducer;