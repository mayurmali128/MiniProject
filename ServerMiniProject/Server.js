var exp = require('express');
var cor = require('cors');
var db = require('mysql2');
var bp = require('body-parser');
const crypto = require('crypto')

var app = exp();

app.listen(9000,()=>{
    console.log("Server started at 9000...");
})

var con = db.createConnection({
    host:"localhost",
    user:"root",
    password:"mayur",
    database:"tiffinschema2"
})

con.connect((err)=>{
    if(!err)
        console.log("Database connected")
    else
        console.log("Error in database connection!!")
})

app.use(cor());
app.use(bp.json());
const hashPassword = password => {
    return crypto.createHash('sha256').update(password).digest('hex')
}
//to check wheather email is already available for registration 
// app.get('/valid_email',(req,res)=>{
//     var email = req.query.email;
//     var q = 'select user_id from user where email=' + email;
//     console.log(q)
//     con.query(q,(err,result)=>{
//         if(!err){
//             if(result.length >=1){
//                 res.send("false");
//             }
//             else{
//                 res.send("true");
//             }
//         }
//         else{
//             console.log("Wronge in valid email..");
//         }
//     })
// })


//to check wheather username is already available for registration
// app.get('/valid_username',(req,res)=>{
//     var username = req.query.username;
//     var q = 'select user_id from user where username = '+username;
//     console.log(q);
//     con.query(q,(err,result)=>{
//         if(!err){
//             if(result.length>=1){
//                 res.send("false");
//             }
//             else{
//                 res.send('true');
//             }
//         }
//         else{
//             console.log("Wronge in valid_username"+err);
//         }
//     })
// })

app.post('/checkLogin',(req,res)=>{
    var username = req.body.username;
    var password = req.body.password;
    var q6 = "select * from user where username='"+username+"'and password='"+ hashPassword(password)+"'";

    con.query(q6,(err,data)=>{
        if(!err){
            if(data.length>=1){
                res.send("true");
            }
            else{
                res.send("false");
            }
        }
        else{
            console.log(err);
        }
    })
})

app.post('/insertdata',(req,res)=>{
    var username = req.body.username;
    var email = req.body.email;
    var mobileno = req.body.mobileno;
    var password = req.body.password;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;

    var q1= "select user_id from user where username='"+username+"'";
    var q2 = "select user_id from user where email='"+email+"'";
    var q3 = "select user_id from user where mobno='"+mobileno+"'";
    var flag = true;
    console.log(q3);
    con.query(q1,(err,data)=>{
        if(!err){
            // console.log(data + " "+ err);
            if(data.length>=1){
                flag = false;
                res.send("Username already exits");
            }
            else{
                con.query(q2,(err,data)=>{
                    if(!err){
                        if(data.length>=1){
                            flag = false;
                            res.send("email already exits");
                        }
                        else{
                            con.query(q3,(err,data)=>{
                                if(!err){
                                    console.log(data + " "+ err);
                                    if(data.length>=1){
                                        flag = false;
                                        res.send("Mobile number already exists.");
                                    }
                                    else{
                                        var q4 = 'insert into user(username,email,mobno,status,roll_id,firstname,lastname,password) values(?,?,?,?,?,?,?,?)';
                                        console.log(password);
                                        con.query(q4,[username,email,mobileno,1,103,firstname,lastname,hashPassword(password)],(err)=>{
                                            if(!err){
                                                res.send("Success");
                                            }
                                            else{
                                                console.log(err);
                                                res.send("failure");
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
            }
        }
        else{
            console.log(err);
        }
    })



    // if(flag){
    //     con.query(q2,(err,data)=>{
    //         if(!err){
    //             if(data.length>=1){
    //                 flag = false;
    //                 res.send("email already exits");
    //             }
    //         }
    //     })
    // }

    // if(flag){
    //     con.query(q3,(err,data)=>{
    //         if(!err){
    //             console.log(data + " "+ err);
    //             if(data.length>=1){
    //                 flag = false;
    //                 res.send("Mobile number already exists.");
    //             }
    //         }
    //     })
    // }

    // console.log(flag);
    // if(flag){
    //     //insert into database
    //     //103 for roll_id
    //     var q4 = 'insert into user(username,email,mobno,status,roll_id,firstname,lastname,password) values(?,?,?,?,?,?,?,?)';
    //     con.query(q4,[username,email,mobileno,1,103,firstname,lastname,hashPassword(password)],(err)=>{
    //         if(!err){
    //             res.send("Success");
    //         }
    //         else{
    //             console.log(err);
    //             res.send("failure");
    //         }
    //     })

    // }

})

app.post('/updatepass',(req,res)=>{
    let username=req.body.username;
    var oldpassword = req.body.oldpassword;
    let newpassword=req.body.newpassword;
    let query="select * from user where username=?"
    
    con.query(query,[username],(err,data)=>{
        if(!err){
            if(data.length>=1){
                let q = "select * from user where username=? and password=?"
                con.query(q,[username,hashPassword(oldpassword)],(err,data1)=>{
                    if(!err){
                        if(data1.length>=1){
                            let q1 = "update user set password=? where username=?"
                            con.query(q1,[hashPassword(newpassword),username],(err)=>{
                                if(!err){
                                    res.send("Password changed successfully.");
                                }
                                else{
                                    res.send("Something went wrong. Try again.");
                                }
                            })
                        }
                        else{
                            res.send("Password does not match")
                        }
                    }
                })
            }
            else{
                res.send("Email not exists. Please register.")
            }
        }
    })
})

app.get("*",(req,res)=>{
    res.send("404 Error!!!")
})