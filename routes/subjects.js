import { Router } from "express";
import {
  create,
  index,
  edit,
  show,
  store,
  update,
  deleteOne,
} from "../controller/subject.js";

const router = new Router();

router.get("/", index);
router.get("/create", create);
router.post("/", store);

router.get("/:id/edit", edit);
router.put("/:id", update);

router.get("/:id", show);
router.delete("/:id", deleteOne);

export default router;
