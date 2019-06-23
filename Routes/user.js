const express=require("express");
const router=express.Router();
const User=require("../Model/users");
const mongoose=require("mongoose");
const Auth = require('../Middleware/auth');
const multer=require("multer");

router.post("/userRegistration",(req,res)=>
{
    console.log(req.body);
    var user= new User(req.body);
    user.save();
    res.json("success");
})

// router.post("/userRegistration",function(req,res)
// {
//     res.send("Responding");

//     const users = new User({
//         userName :req.body.user_Name,
//         userEmail :req.body.user_Email,
//         userPassword :req.body.user_Password,
//         userImage :req.body.user_Image,
//         city :req.body.city,
//         postal : req.body.postal,
//         userAddress1 : req.body.user_Address1,
//         userAddress2 :req.body.user_Address2
       
//     });
//     console.log(users)
//     users.save().then(result=>{
//         console.log(result);
//         res.status(201).json({
//             message:"User Registred"
//         })
//     }).catch(err=>{
//         res.status(500).json({
//             error:err
//         })
//     })
// });

router.post("/userLogin",async function(req,res){
    console.log("login responding")
    console.log(req.body);
    var logindata = new User(req.body);

    var askeduserName =logindata.username;
    var askeduserPassword = logindata.userpassword;
    const users = await users.checkCredentialsDb(askeduserName,askeduserPassword);

    if(users){
        const token = await users.generateAuthToken();
        res.status(201).json({
            token:token,
            users:users
        });
        res.json({
            message:"Logged in"
        })
    }
    else{
        res.json({
            message:"Invalid! Login Denied!!"
        })
    }
})

router.get('/this',Auth,function(req,res){
    console.log("responding")
    res.send(req.users);
})

router.get('/respond',function(req,res){
    res.send("responding")
    console.log("responding")
})
module.exports = router;