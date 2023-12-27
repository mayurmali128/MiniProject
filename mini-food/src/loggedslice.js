import { createSlice } from "@reduxjs/toolkit";

//application state - logged in status
export const loggedSlice = createSlice({
    name: "logged",
    initialState: {
        value: false,
        username:"",
    },
    reducers : {
        loginlogout: (state,action)=> {

            if(action.type=="login"){
                return {...state,value:true,username:action.user};
            }
            else{
                return {...state,value:false ,username:""};
            }
        },

        // logout: (state) => { return {value:false, username:""}},

        // setUsername:(state,str) => {state.username = str}

    },
})
//component actions - useDispatch
export const {loginlogout} = loggedSlice.actions
//will be used in store
export default loggedSlice.reducer;