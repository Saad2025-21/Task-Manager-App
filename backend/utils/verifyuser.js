import handleError from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token) return next(handleError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(handleError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};


export const adminOnly = (req, res, next) => {
     console.log("User in adminOnly:", req.user);
    if (req.user.role === 'admin') {

        next();
    } else {
        return next(handleError(403, "You are not authorized to access this resource!"));
    }
}