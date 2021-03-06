import { response } from "express";
import { validationResult } from "express-validator";
import * as bcrypt from "bcryptjs";
import User from "../models/UserModel";
import { generateJWT } from "../helpers/jwt";
import { userLogger } from "../utils/logger";

// Create new user
const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    // Check email if already registered
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "Email aready registered",
      });
    }

    user = new User(req.body);

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();
    userLogger.info("User created");

    // Generate JWT
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error en el servidor, intenta nuevamente mas tarde",
    });

    
  }
};

// Login
const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Verify email
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "Invalid credentials",
      });
    }

    // Verify passwords
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Invalid credentials",
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id, user.name);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error en el servidor, intenta nuevamente mas tarde",
    });
  }
};

// Renew user token
const renewToken = async (req, res = response) => {
  const uid = req.uid;
  const name = req.name;

  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    token,
  });
};

export {
  createUser,
  loginUser,
  renewToken,
};
