import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login user
const loginUser=async(req,res)=>{
  const {email,password}=req.body;
  try{
    //checking if user exists
    const user=await userModel.findOne({email});
    if(!user){
      return res.json({success:false,message:"user does not exits"})
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.json({success:false,message:"invalid credentials"});
    }
    const token=createToken(user._id);
    res.json({success:true,token})
}catch(error){
    console.log(error);
    res.json({success:false,message:"error"})
  }
}

//create token
const createToken=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser=async(req,res)=>{
  const {name,password,email}=req.body;
  try{
    //checking is user already exists
    const exists=await userModel.findOne({email});
    if(exists){
      return res.json({success:false,message:"user already exist"})
    }
    //validating email format & strong password
    if(!validator.isEmail(email)){
      return res.json({success:false,message:"Please enter a valid email"})
    }
    if(password.length<8){
      return res.json({success:false,message:"please enter a strong password"})
    }
    //hashing password
    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(password,salt);
    //creating user
    const newUser=new userModel({
      name:name,
      email:email,
      password:hashPassword
    })
    const user=await newUser.save()
    const token=createToken(user._id)
    res.json({success:true,token})

  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"})
  }
  
  
}


export{loginUser,registerUser}