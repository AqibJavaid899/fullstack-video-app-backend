import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export default (req, res, next) => {
  // Get the Acess Token from the Cookie
  const accessToken = req.cookies.access_token;
  // Check the existence of Access Token
  if (!accessToken) return next(createError(401, "You are not authenticated!"));

  jwt.verify(accessToken, process.env.SECRET_KEY, (error, user) => {
    if (error)
      return next(
        createError(
          403,
          "Token is not valid! Please try again with a correct token."
        )
      );
    req.user = user;
    next();
  });
};
