
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
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
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
});

userSchema.statics.checkCredentialsDb=async(username,password)=>
{
  
    const user1=await User.findOne({userName:username,userPassword:password})
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