import { useReducer, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {Link } from "react-router-dom";
import { login } from "../loggedslice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
// import ProtectedRoutes from "./protectedroutes";

//site key : 6Ld2vjgpAAAAAB-cpCkxehmhmZpd-TCmevbbg4De
//secret key: 6Ld2vjgpAAAAAOrqK3oEHtpokELb00UHjmte2YXM

const LoginForm = ()=>{

    
    const init ={
        username :{value:"",valid:false, touch:false, error:""},
        password :{value:"",valid:false, touch:false, error:""},
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
            case "username":
                var exp1  = /^[0-9a-zA-Z]{4,15}$/
                if(!exp1.test(v)){
                    ch = false;
                    msg = "Username should be between 4 to 15 characters and contains only digit and characters."
                }
                break;
            case "password":
                var exp2 = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/;
                if(!exp2.test(v)){
                    ch = false;
                    msg = "Password must contain Minimum 8 and maximum 15 characters, at least one uppercase letter, one lowercase letter, one number and one special character."
                }
                break;
        }
        return {ch,msg};
    }

    const handleChange= (f,v)=>{
        const{ch,msg} = checkValid(f,v);
        dispatch({type:"update",fld:f,val:{value:v,valid:ch,touch:true,error:msg}});
    }

    //for capcha
    const[capVal,setCapVal] = useState(null);
    const[str,setStr] = useState('false');
    const dispatchRedux = useDispatch();

    const checkLogin = (e)=>{
        e.preventDefault();
        console.log(cust);
        const reqOption = {
            method:"POST",
            headers:{'content-type':'application/json'},
            body : JSON.stringify({
                username:cust.username.value,
                password:cust.password.value
            })
        }
        fetch('http://localhost:9000/checkLogin',reqOption)
        .then(resp=>resp.text())
        .then(str =>{
            console.log(str);
            if(str=='true'){
                dispatchRedux(loginlogout{type:"login",user:cust.username.value,val:true});
                navigate('/dashboard');
            }
            else{
                alert("Wronge username or password.");
                navigate('/login');
            }
        });
    }

    let navigate = useNavigate();

    return(
        <div>
            <Header/>
            <div className="container mt-5  col-md-4 bg-light needs-validation pb-5 pt-5">
                <div className="row">
                    <div className="col justify-content-center mt-3 mb-3 pt-4 pb-4" style={{backgroundColor:"white"}}>
                        <Link to="/login" style={{textDecoration: "none"}}>Login</Link>
                    </div>
                    <div className="col justify-content-center mt-3 mb-3 pt-4 pb-4">
                        <Link to="/register" style={{textDecoration: "none"}}> Register </Link>
                    </div>

                </div>

                <label for="validationServer01" class="form-label ">Enter username</label>
                <div class="input-group has-validation">
                    {/* <label for="validationServer01" class="form-label">Enter username</label> */}
                    <span class="input-group-text" id="inputGroupPrepend3">@</span>
                    <input type="text" className={cust.username.touch?(cust.username.valid? "form-control is-valid":"form-control is-invalid"):"form-control"} id="validationServerUsername" aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" placeholder="username"required
                    value={cust.username.value} onChange={(e)=>{handleChange("username",e.target.value)}}/>
                    <div id="validationServerUsernameFeedback" className={cust.username.valid?"valid-feedback":"invalid-feedback"}>
                        {cust.username.error}
                    </div>
                </div>

                
                <label for="validationServer01" class="form-label pt-4">Password</label>
                <div class="input-group has-validation">
                    {/* <label for="validationServer01" class="form-label">Password</label> */}
                    <input type="password" className={cust.password.touch?(cust.password.valid? "form-control is-valid":"form-control is-invalid"):"form-control"} id="validationServer01" placeholder="Password"required
                    value={cust.password.value} onChange={(e)=>{handleChange("password",e.target.value)}}/>
                    <div className={cust.password.valid?"valid-feedback":"invalid-feedback"}>
                        {cust.password.error}
                    </div>
                </div>


                <div class="mt-3 ms-5 me-5 pt-4 ps-4">
                    <ReCAPTCHA 
                    sitekey="6Ld2vjgpAAAAAB-cpCkxehmhmZpd-TCmevbbg4De" 
                    onChange={(e)=>{
                        setCapVal(e);
                    }}></ReCAPTCHA>
                </div>

                <div class="mt-3 d-grid gap-2 ms-5 me-5 pt-4">
                    <button className={cust.username.valid&&cust.password.valid&&capVal!=null ? "btn btn-primary":"btn btn-primary disabled"}
                    onClick={(e)=>{
                        checkLogin(e);
                        // if(str=='true'){
                        //     login();
                        //     navigate('/userhome');
                        // }
                        // else{
                        //     alert("Wronge username or password.");
                        //     navigate('/login');
                        // }
                    }}>Login</button>
                </div>

            </div>
        </div>
    )
}

const RegistrationForm = ()=>{

    const init ={
        firstname:{value:"",valid:false, touch:false, error:""},
        lastname:{value:"",valid:false, touch:false, error:""},
        email:{value:"",valid:false, touch:false, error:""},
        mobileno: {value:"",valid:false, touch:false, error:""},
        username :{value:"",valid:false, touch:false, error:""},
        password :{value:"",valid:false, touch:false, error:""},
        confirmpassword :{value:"",valid:false, touch:false, error:""}
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
    // const [email1,setEmail] = useState("");
    // const [username,setUsername] = useState("");

    //for button
    // const [bt,setbt] = useState(false);

    //for cpatcha
    const[capVal,setCapVal] = useState(null);
    const checkValid = (fld,v)=>{
        var ch = true;
        var msg = "Looks good!";
        switch(fld){
            case "firstname":
                var exp1 = /^[A-Z]{1}[a-z]{1,15}$/;
                if(!exp1.test(v)){
                    ch = false;
                    msg = 'First character must be capital and rest are small.'
                }
                break;
            case "lastname":
                var exp2 = /^[A-Z]{1}[a-z]{1,15}$/;
                if(!exp2.test(v)){
                    ch = false;
                    msg = 'First character must be capital and rest are small.';
                }
                break;
            case "email":
                var exp3 = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
                // var url = "http://localhost:9000/valid_email?email=%27"+v+"%27";
                // console.log(url);
                // fetch(url).then((resp)=>{return resp.text()}).then((data)=>{setEmail(data)});
                // console.log(email);
                if(!exp3.test(v)){
                    ch=false;
                    msg = "Please enter valid email."
                }
                // else if(exp3.test(v)){
                //     var url = "http://localhost:9000/valid_email?email=%27"+v+"%27";
                //     fetch(url).then((resp)=>{return resp.text()}).then((data)=>{
                //         if(data=='false'){
                //             ch=false;
                //             msg = "Email already taken";
                //         }
                //     });
                // }
                break;
            case "mobileno":
                var exp4 = /^[0-9]{10}$/;
                if(!exp4.test(v)){
                    ch = false;
                    msg = "Please enter valid mobile number."
                }
                break;
            case "username":
                var exp5  = /^[0-9a-zA-Z]{4,15}$/
                // var url1 = "http://localhost:9000/valid_username?username="+v;
                // fetch(url1).then((resp)=>{return resp.text()}).then((data)=>{setUsername(data)});
                if(!exp5.test(v)){
                    ch = false;
                    msg = "Username should be between 4 to 15 characters and contains only digit and characters."
                }
                // if(username==="false"){
                //     ch = false;
                //     msg = "Username already taken.";
                // }
                break;
            
            case "password":
                var exp6 = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/;
                if(!exp6.test(v)){
                    ch = false;
                    msg = "Password must contain Minimum 8 and maximum 15 characters, at least one uppercase letter, one lowercase letter, one number and one special character."
                }
                if(cust.confirmpassword.value.length != 0){
                    cust.confirmpassword.value = "";
                    cust.confirmpassword.touch = false;
                }
                break;
            case "confirmpassword":
                // console.log(v);
                console.log(cust.password)
                if(cust.password.value != v){
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

    const[msg,setMsg] = useState("");

    const submitData = (e)=>{
        e.preventDefault();

        console.log(cust);
        const reqOption = {
            method:"POST",
            headers:{'content-type':'application/json'},
            body : JSON.stringify({
                username:cust.username.value,
                mobileno:cust.mobileno.value,
                password:cust.password.value,
                firstname:cust.firstname.value,
                lastname:cust.lastname.value,
                email:cust.email.value
            })
        }


        fetch('http://localhost:9000/insertdata',reqOption)
        .then(resp=>resp.text())
        .then(str =>setMsg(str));

        dispatch(init);
        setCapVal(null);
        console.log("Meassge"+msg);
    } 
    
    return(
        <div>
            <Header/>
            <div className="container mt-5  col-md-4 bg-light needs-validation pb-5 pt-5 rounded">
                <div className="row">
                    <div className="col justify-content-center mt-3 mb-3 pt-4 pb-4">
                        <Link to="/login" style={{textDecoration: "none"}}>Login</Link>
                    </div>
                    <div className="col justify-content-center mt-3 mb-3 pt-4 pb-4" style={{backgroundColor:"white"}}>
                        <Link to="/register" style={{textDecoration: "none"}} > Register </Link>
                    </div>
                </div>

                <div className="row">
                    <div class="col-md">
                        <label  class="form-label">First name</label>
                        <input type="text" className={cust.firstname.touch?(cust.firstname.valid? "form-control is-valid":"form-control is-invalid"):"form-control"} id="validationServer01" placeholder="First name" required
                        value={cust.firstname.value}
                        onChange={(e)=>{
                            handleChange("firstname",e.target.value);
                        }}/>
                        <div className={cust.firstname.valid?"valid-feedback":"invalid-feedback"}>
                            {cust.firstname.error}
                        </div>
                    </div>
                    <div class="col-md">
                        <label  class="form-label">Last name</label>
                        <input type="text" className={cust.lastname.touch?(cust.lastname.valid? "form-control is-valid":"form-control is-invalid"):"form-control"} id="validationServer01" placeholder="First name" required
                        value={cust.lastname.value}
                        onChange={(e)=>{
                            handleChange("lastname",e.target.value);
                        }}/>
                        <div className={cust.lastname.valid?"valid-feedback":"invalid-feedback"}>
                            {cust.lastname.error}
                        </div>
                    </div>
                </div>

                <label  className="form-label">Email</label>
                <input type="email" className={cust.email.touch?(cust.email.valid? "form-control is-valid":"form-control is-invalid"):"form-control"} id="validationServer01" placeholder="email" required
                value={cust.email.value}
                onChange={(e)=>{
                    handleChange("email",e.target.value);
                }}/>
                <div className={cust.email.valid?"valid-feedback":"invalid-feedback"}>
                    {cust.email.error}
                </div>

                <label className="form-label ">Mobile No:</label>
                <div class="input-group has-validation">
                    {/* <label for="validationServer01" class="form-label">Enter username</label> */}
                    <span class="input-group-text" id="inputGroupPrepend3">+91</span>
                    <input type="text" className={cust.mobileno.touch?(cust.mobileno.valid? "form-control is-valid":"form-control is-invalid"):"form-control"} id="validationServerUsername" aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" placeholder="Mobile No"required
                    value={cust.mobileno.value}
                    onChange={(e)=>{
                        handleChange("mobileno",e.target.value);
                    }}/>
                    <div className={cust.mobileno.valid?"valid-feedback":"invalid-feedback"}>
                        {cust.mobileno.error}
                    </div>
                </div>

                <label  className="form-label ">Select username</label>
                <div class="input-group has-validation">
                    {/* <label for="validationServer01" class="form-label">Enter username</label> */}
                    <span class="input-group-text" id="inputGroupPrepend3">@</span>
                    <input type="text" className={cust.username.touch?(cust.username.valid? "form-control is-valid":"form-control is-invalid"):"form-control"} id="validationServerUsername" aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" placeholder="select username"required
                    value={cust.username.value}
                    onChange={(e)=>{
                        handleChange("username",e.target.value);
                    }}/>
                    <div className={cust.username.valid?"valid-feedback":"invalid-feedback"}>
                        {cust.username.error}
                    </div>
                </div>

                <label className="form-label ">Password</label>
                <div class="input-group has-validation">
                    {/* <label for="validationServer01" class="form-label">Password</label> */}
                    <input type="password" className={cust.password.touch?(cust.password.valid? "form-control is-valid":"form-control is-invalid"):"form-control"} id="validationServer01" placeholder="Password"required
                    value={cust.password.value} onChange={(e)=>{handleChange("password",e.target.value)}}/>
                    <div className={cust.password.valid?"valid-feedback":"invalid-feedback"}>
                        {cust.password.error}
                    </div>
                </div>

                <label  className="form-label">Confirm Password</label>
                <div class="input-group has-validation">
                    {/* <label for="validationServer01" class="form-label">Password</label> */}
                    <input type="password" className={cust.confirmpassword.touch?(cust.confirmpassword.valid? "form-control is-valid":"form-control is-invalid"):"form-control"} id="validationServer01" placeholder="confirmpassword"required
                    value={cust.confirmpassword.value} onChange={(e)=>{handleChange("confirmpassword",e.target.value)}}/>
                    <div className={cust.confirmpassword.valid?"valid-feedback":"invalid-feedback"}>
                        {cust.confirmpassword.error} 
                    </div>
                </div>

                <div class="mt-3 ms-5 me-5 pt-4 ps-4">
                    <ReCAPTCHA 
                    sitekey="6Ld2vjgpAAAAAB-cpCkxehmhmZpd-TCmevbbg4De" 
                    onChange={(e)=>{
                        setCapVal(e);
                    }}></ReCAPTCHA>
                </div>

                <div class="mt-3 d-grid gap-2 ms-5 me-5">
                    <button className={cust.firstname.value && cust.lastname.valid && cust.email.valid && cust.mobileno.valid 
                        && cust.username.valid && cust.password.valid && cust.confirmpassword.valid && capVal != null? "btn btn-primary":"btn btn-primary disabled"} 
                        onClick={(e)=>{
                            submitData(e);
                        }}>Register</button>
                </div>

                <div className={msg=='Success'? "alert alert-primary mt-5":"alert alert-danger mt-5"} role="alert" style={{display:msg!=""? 'block':'none'}}>
                        {msg}
                </div>
            </div>
        </div>
    )
}

export {LoginForm,RegistrationForm}