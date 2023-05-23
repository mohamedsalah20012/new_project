import { Router } from "express";
import {
  login,
  loginForm,
  register,
  registerForm,
} from "../controller/user.js";
const router = new Router();

router.get("/register", registerForm);
router.post("/register", register);

router.get("/", loginForm);
router.get("/login", loginForm);
router.post("/login", login);

export default router;
