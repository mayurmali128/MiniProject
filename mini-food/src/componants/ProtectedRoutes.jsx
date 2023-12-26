import React from "react";
import { useSelector } from "react-redux"

import { Navigate } from "react-router-dom";

function ProtectedRoutes(props){
    const mystate = useSelector(state=>state.logged.value);
    console.log("Inside ProtectedRoutes" + mystate);
    // const auth = mystate;
    const {Component} = props;
    return mystate ? <Component/> : <Navigate to='/login'/>
}

export default ProtectedRoutes;