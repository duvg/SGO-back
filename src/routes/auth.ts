/**
 * Auth Routes
 * host + /api/auth
 */
 import { Router } from "express";
 import { check } from "express-validator";
 import { validateFields } from "../middlewares/field-validator";
 import { createUser, loginUser, renewToken } from "../controllers/auth";
 import { validateJWT } from "../middlewares/validate-jwt";
 
 const authRouter = Router();
 
 authRouter.post(
   "/new",
   [
     check("name", "Name is required").not().isEmpty(),
     check("email", "Email is required").isEmail(),
     check("password", "Password must have a minimum of 6 characters").isLength({
       min: 6,
     }),
     validateFields,
   ],
   createUser
 );
 
 // Login
 authRouter.post(
   "/",
   [
     check("email", "Email is required").isEmail(),
     check("password", "Passwod must have a minimum of 6 characters").isLength({
       min: 6,
     }),
     validateFields,
   ],
   loginUser
 );
 
 // Renew token
 authRouter.get("/renew", validateJWT, renewToken);
 
export default authRouter;
 