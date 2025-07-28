const { generateToken } =require("../utils/generateTokens");
const User =require("../models/User");

const bcrypt = require("bcrypt");

exports.register = async (req,res)=>{
    try{
        const {name, email, password} = req.body;
        const exists = await User.findOne({email});
        if (exists)
            return res.status(400).json({message:"User Already exists"});
        const user = await User.create({name, email,password});
        const tokens = generateToken(user);
        res.json({user,...tokens});
    }catch (error){
        res.status(500).json({error: error.message});
    }
};

// exports.login = async (req, res)=>{
//     try{
//         const {email, password} = req.body;
//         const user= await User.findOne({email});
//         if(!user || !(await bcrypt.compare(password, user.password))){
//             return res.status(400).json({message:" Invalid credentials"});
//         }

//         const tokens = generateToken(user);
//         res.json({user,...tokens});
//     }catch (error){
//         res.status(500).json({error: error.message});
//     }
// }

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch for email:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const tokens = generateToken(user);
    res.json({ user, ...tokens });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.refresh = async (req,res)=>{
    const {refreshToken} = req.body;
    if(!refreshToken)
        return res.status(401).json({message: "Refresh Token not provided"});

    try{
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id);
        if(!user)
            return res.status(403).json({message: "User not found"});

        const newAccessToken = jwt.sign(
           { id:user._id, name:user.name, email:user.email},
            process.env.JWT_SECRET, {expiresIn:"1d"}
        );
    }catch (error){
        return res.status(403).json({message: "Invalid or expired refresh token"});
    }
}

exports.logout = async(req,res)=>{
  const {refreshToken }= req.body;
  const existinguser= await users.findOne({refreshToken});
  if(existinguser){
    existinguser.refreshToken= null;
    await existinguser.save();
  }
  res.json({message:"Logged out"});
}