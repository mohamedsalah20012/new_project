import express from "express";
import { engine } from "express-handlebars";
import methodOverride from "method-override";
import multer from "multer"
import path from 'path'


import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";

import mongoose from "mongoose";
mongoose.connect(process.env.mongoConnectionUrl);

import authRoutes from "./routes/auth.js";
import subjectsRouter from "./routes/subjects.js";
import { authentication } from "./middleware/authentication.js";
import doctorRoutes from "./routes/doctor.js";
import departmentRouter from "./routes/department.js";

const app = express();


// const url = path.join(__dirname, "public/uploads/");

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./tamplates");
app.use("/public", express.static("C:\Users\hp\Desktop\node-project\public"));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, url);
  },
  filename: (req, file, cb) => {
    cb(null, "__" + file.originalname);
  },
});

const upload = multer({ storage });

app.use("/", authRoutes);
app.use("/subjects", authentication, subjectsRouter);
app.use("/doctors", doctorRoutes);
app.use("/departments", departmentRouter);

app.post("/doctors/upload", upload.single("file"), async (req, res) => {
  const fileData = {
    path: req.file?.path,
    originalName: req.file?.originalname,
  };

  
console.log('filedata',fileData)
  res.redirect("/doctors/");
});

app.listen(process.env.port, () => {
  console.log(
    `started the application on http://localhost:${process.env.port}`
  );
});
