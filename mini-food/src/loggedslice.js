import { createSlice } from "@reduxjs/toolkit";

//application state - logged in status
export const loggedSlice = createSlice({
    name: "logged",
    initialState: {
        value: false
    },
    reducers : {
        login: (state)=> {state.value=true},

        logout: (state) => { state.value=false}
    }
})
//component actions - useDispatch
export const {login,logout} = loggedSlice.actions
//will be used in store
export default loggedSlice.reducer;