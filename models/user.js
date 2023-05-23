import { Schema, model } from "mongoose";

const user = new Schema(
  {
   
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: false,
    },
    age: {
      type: Number,
      required: false,
    },
    userType: {
      type: String,
      required: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "department",
    },
  },
  { timestamps: true }
);

export default model("user", user);
