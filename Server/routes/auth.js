const express =require("express");
const { register, login, refresh } = require("../Controllers/authController");
const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/refresh",refresh);

const logout = async(req,res)=>{
  const {refreshToken }= req.body;
  const existinguser= await users.findOne({refreshToken});
  if(existinguser){
    existinguser.refreshToken= null;
    await existinguser.save();
  }
  res.json({message:"Logged out"});
}
module.exports = { logout, refresh};
