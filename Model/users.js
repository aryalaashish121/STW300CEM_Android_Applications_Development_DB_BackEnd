
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    userName:{
        type:String
    },
    userEmail:{
        type:String
    },
    userPassword:{
        type:String
    },
    userImage:{
        type:String
    },
    
    city:{
        type:String
    },
    postal:{
        type:String
    },
    userAddress1:{
        type:String
    },
    userAddress2:{
        type:String
    },
    userPhone:{
        type:String
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
});

userSchema.statics.checkCredentialsDb=async(user,pass)=>
{
  
const user1 = await Users.findOne({userEmail:user,userPassword:pass})
    console.log(user1);
    return user1;
}

userSchema.methods.generateAuthToken=async function(){
    
    console.log("token");
    const user=this
    const token=jwt.sign({ _id:user._id.toString()},'thisismynewcourse')
    console.log(token);
    user.tokens=user.tokens.concat({token:token})
    await user.save()
    return token
}


const Users=mongoose.model("users",userSchema);
module.exports=Users;