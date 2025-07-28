const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if(!token)
      return res.status(401).json({message:"No token provided"}); // Assumes "Bearer <token>"

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodeData.id;
    console.log("authHeader:", authHeader);
    console.log("decoded:", decodeData);

    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = auth;
