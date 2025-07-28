const jwt = require("jsonwebtoken");

exports.generateToken = (user) =>{
    const accessToken = jwt.sign({ id: user._id,name: user.name, email: user.email},
        process.env.JWT_SECRET, {expiresIn :"1d"}
    );

    const refreshToken = jwt.sign({id: user._id},
        process.env.JWT_REFRESH_SECRET,{expiresIn:"7d"}
    );

    return {accessToken, refreshToken};
}