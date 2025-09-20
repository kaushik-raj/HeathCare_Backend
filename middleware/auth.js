import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, no token" });
  }

  try {

    // Verify and decode
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded looks like { id: "...", iat: ..., exp: ... }
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: "Not authorized, token failed" });
  }
};
