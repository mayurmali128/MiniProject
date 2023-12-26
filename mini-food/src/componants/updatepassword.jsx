import React from "react";
import {useReducer, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import UserHeader from "./UserHeader";

export default function UpdatePassword(){
    
    const init ={
        email:{value:"",valid:false, touch:false, error:""},
        oldpassword: {value:"",valid:false, touch:false, error:""},
        newpassword :{value:"",valid:false, touch:false, error:""},
        confirmnewpassword :{value:"",valid:false, touch:false, error:""}
    }

    const reducer = (state,action)=>{
        if(action.type==="update"){
            return {...state,[action.fld]:action.val};
        }
        else{
            return init;
        }
    }

    const [cust,dispatch] = useReducer(reducer,init);

    const checkValid = (fld,v)=>{
        var ch = true;
        var msg = "Looks good!";
        switch(fld){
            case "email":
                var exp3 = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
                if(!exp3.test(v)){
                    ch=false;
                    msg = "Please enter valid email."
                }
                break;          
            case "newpassword":
                var exp6 = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/;
                if(!exp6.test(v)){
                    ch = false;
                    msg = "Password must contain Minimum 8 and maximum 15 characters, at least one uppercase letter, one lowercase letter, one number and one special character."
                }
                if(cust.confirmnewpassword.value.length != 0){
                    cust.confirmnewpassword.value = "";
                    cust.confirmnewpassword.touch = false;
                }
                break;
            case "oldpassword":
                var exp6 = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/;
                if(!exp6.test(v)){
                    ch = false;
                    msg = "Password must contain Minimum 8 and maximum 15 characters, at least one uppercase letter, one lowercase letter, one number and one special character."
                }
                if(cust.confirmnewpassword.value.length != 0){
                    cust.confirmnewpassword.value = "";
                    cust.confirmnewpassword.touch = false;
                }
                break;
            case "confirmnewpassword":
                if(cust.newpassword.value != v){
                    ch = false;
                    msg = "Password mismatched."
                }
                break;
            
        }
        // console.log(ch +" " +msg);
        return {ch,msg};
    }

    const handleChange= (f,v)=>{
        const{ch,msg} = checkValid(f,v);
        dispatch({type:"update",fld:f,val:{value:v,valid:ch,touch:true,error:msg}});
    }

    
    const [msg,setMsg] = useState("");

    const submitData = (e)=>{
        console.log("Inside submit");
        e.preventDefault();
        axios.post('http://localhost:9000/updatepass', {
            email: cust.email.value,
            oldpassword:cust.oldpassword.value,
            newpassword:cust.newpassword.value
          })
          .then((response) => {
            // console.log("Inside axios result");
            // console.log(response.data)
            setMsg(response.data);
            dispatch(init);
          }, (error) => {
            console.log(error);
          });
    }


    // for capcha
    const[capVal,setCapVal] = useState(null);
    
    return(
        <div>
            <UserHeader/>
            <div className="container mt-5  col-md-4 bg-light needs-validation pb-5 pt-5 rounded">

                {/* email */}
                <label  className="form-label">Email</label>
                <input type="email" className={cust.email.touch?(cust.email.valid? "form-control is-valid":"form-control is-invalid"):"form-control"} id="validationServer01" placeholder="email" required
                value={cust.email.value}
                onChange={(e)=>{
                    handleChange("email",e.target.value);
                }}/>
                <div className={cust.email.valid?"valid-feedback":"invalid-feedback"}>
                    {cust.email.error}
                </div>

                {/* old password */}
                <label className="form-label ">Old Password</label>
                <div class="input-group has-validation">
                    {/* <label for="validationServer01" class="form-label">Password</label> */}
                    <input type="password" className={cust.oldpassword.touch?(cust.oldpassword.valid? "form-control is-valid":"form-control is-invalid"):"form-control"} id="validationServer01" placeholder="Password"required
                    value={cust.oldpassword.value} onChange={(e)=>{handleChange("oldpassword",e.target.value)}}/>
                    <div className={cust.oldpassword.valid?"valid-feedback":"invalid-feedback"}>
                        {cust.oldpassword.error}
                    </div>
                </div>
                
                {/* new password */}
                <label className="form-label ">New Password</label>
                <div class="input-group has-validation">
                    {/* <label for="validationServer01" class="form-label">Password</label> */}
                    <input type="password" className={cust.newpassword.touch?(cust.newpassword.valid? "form-control is-valid":"form-control is-invalid"):"form-control"} id="validationServer01" placeholder="Password"required
                    value={cust.newpassword.value} onChange={(e)=>{handleChange("newpassword",e.target.value)}}/>
                    <div className={cust.newpassword.valid?"valid-feedback":"invalid-feedback"}>
                        {cust.newpassword.error}
                    </div>
                </div>

                {/* Confirm new password */}
                <label  className="form-label">Confirm New Password</label>
                <div class="input-group has-validation">
                    {/* <label for="validationServer01" class="form-label">Password</label> */}
                    <input type="password" className={cust.confirmnewpassword.touch?(cust.confirmnewpassword.valid? "form-control is-valid":"form-control is-invalid"):"form-control"} id="validationServer01" placeholder="confirmnewpassword"required
                    value={cust.confirmnewpassword.value} onChange={(e)=>{handleChange("confirmnewpassword",e.target.value)}}/>
                    <div className={cust.confirmnewpassword.valid?"valid-feedback":"invalid-feedback"}>
                        {cust.confirmnewpassword.error} 
                    </div>
                </div>

                {/* cpacha */}
                <div class="mt-3 ms-5 me-5 pt-4 ps-4">
                    <ReCAPTCHA 
                    sitekey="6Ld2vjgpAAAAAB-cpCkxehmhmZpd-TCmevbbg4De" 
                    onChange={(e)=>{
                        setCapVal(e);
                    }}></ReCAPTCHA>
                </div>

                <div class="mt-3 d-grid gap-2 ms-5 me-5">
                    <button className={cust.email.valid && cust.oldpassword.valid && cust.newpassword.valid && cust.confirmnewpassword.valid 
                    && capVal != null? "btn btn-primary":"btn btn-primary disabled"} 
                        onClick={(e)=>{
                            submitData(e);
                        }}>Update</button>
                </div>

                <div className={msg=="Password changed successfully."? "alert alert-primary mt-5":"alert alert-danger mt-5"} role="alert" style={{display:msg!=""? 'block':'none'}}>
                        {msg}
                </div>

            </div>
            
        </div>
    )
}