const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const users = require("../models/User");
const express =require("express");
const router = express.Router();

const generateToken = (user) =>{
  return jwt.sign({id:user._id, email:user.email,name:user.name},process.env.JWT_SECRET,{
         expiresIn:'1h',
     });
}

const generateRefreshhToken = (user)=>{
  return jwt.sign({id:user._id, email:user.email,name:user.name},process.env.JWT_SECRET,{
         expiresIn:'1d',
     });
}

// Signup Controller
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existinguser = await users.findOne({ email: email.trim().toLowerCase() });
    if (existinguser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await users({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    });
    await newUser.save();

    // const token = jwt.sign(
    //   { email: newUser.email, id: newUser._id },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1h" }
    // );
    const accessToken = generateToken(newUser);
    const refreshToken = generateRefreshhToken(newUser);
    newUser.refreshToken= refreshToken;
    await newUser.save();

    res.status(201).json({ user:{id:newUser._id, new:newUser.name, email: newUser.email}, accessToken,refreshToken });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Something went wrong..." });
  }
};

// Login Controller
const login = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Incoming body:", req.body);

  try {
    const existinguser = await users.findOne({ email: email.trim().toLowerCase() });
    if (!existinguser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // OPTIONAL: Remove this if you don't want name check
    // if (name && name.trim().toLowerCase() !== existinguser.name.trim().toLowerCase()) {
    //   return res.status(400).json({ message: "Username is incorrect" });
    // }

    const isPasswordCrt = await bcrypt.compare(password,existinguser.password);
    if (!isPasswordCrt) {
      console.log("Password mismatch", password, "vs", existinguser.password);
      return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log("Plain:", req.body.password);
console.log("Hashed:", existinguser.password);
console.log("Match:", await bcrypt.compare(req.body.password, existinguser.password));


    const accessToken = generateToken(existinguser);
    const refreshToken = generateRefreshhToken(existinguser);
    existinguser.refreshToken= refreshToken;
    await existinguser.save();

    res.status(200).json({ user: {id: existinguser._id, name: existinguser.name, email: existinguser.email}, accessToken,refreshToken});
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Something went wrong..." });
  }
};

const refresh = async (req,res) =>{
  const {refreshToken}= req.body;
  if(!refreshToken)
    return res.sendStatus(401);

  try{
    const decoded = jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET);
    const existinguser = await users.findById(decoded.id);
    if(!existinguser || existinguser.refreshToken !==refreshToken)
      return res.sendStatus(403);

    const newAccessToken = generateToken(existinguser);
    const newRefreshToken = generateRefreshhToken(existinguser);
    existinguser.refreshToken= newRefreshToken;
    await existinguser.save();
  router.post("/refresh",refresh);
    res.json({accessToken: newAccessToken, refreshToken: newRefreshToken});
  }catch (error) {
    res.status(403).json({message:"Invalid refresh token"});
  }
}

const logout = async(req,res)=>{
  const {refreshToken }= req.body;
  const existinguser= await users.findOne({refreshToken});
  if(existinguser){
    existinguser.refreshToken= null;
    await existinguser.save();
  }
  res.json({message:"Logged out"});
}
module.exports = {signup,login, logout, refresh};
