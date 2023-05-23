import user from "../models/user.js";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

export const registerForm = (req, res) => {
  res.render("authentication/register");
};

export const register = async (req, res) => {
  const { username, email, age, userType, password } = req.body;
  console.log({ username, email, userType, password });

  var salt = bcrypt.genSaltSync(10);
  const encryptedPassword = bcrypt.hashSync(password, salt);
  await user.create({
    username,
    email,
    age,
    userType,
    password: encryptedPassword,
  });

  //await user.create({ username, email, password });
  res.redirect("/login");
};

export const loginForm = (req, res) => {
  res.render("authentication/login");
};

export const login = async (req, res) => {
  const { username, email, password } = req.body;

  const loggedUser = await user.findOne({ email });

  console.log(loggedUser);
  const isCorrectPassword = bcrypt.compareSync(password, loggedUser?.password);
  if (!isCorrectPassword) {
    return res.redirect("/login");
  }
  const data = {
    _id: loggedUser._id,
    email: loggedUser.email,
  };

  const jwtToken = jwt.sign(data, process.env.JWT_SECTRET);

  console.log(jwtToken);

  res.cookie("token", jwtToken);
  res.cookie('_id',loggedUser._id)

  if (loggedUser?.userType == "Admin") {
    return res.redirect("/subjects");
  } else if (loggedUser?.userType == "Doctor") {
    return res.redirect("/doctors");
  } else if (loggedUser?.userType == "Student") {
    return res.send("I'm a Student");
  }
};
