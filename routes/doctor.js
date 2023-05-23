import { Router } from "express";
import { show ,uploadForm} from "../controller/doctors.js";

const doctorRoutes = new Router();


doctorRoutes.get("/", show);
doctorRoutes.get('/upload/:id',uploadForm)

export default doctorRoutes;
