import { Router } from "express";
import { addDepForm,addDep, index } from "../controller/department.js";
import department from "../models/department.js";

const departmentRouter = new Router();


departmentRouter.get('/',index)
departmentRouter.get("/add", addDepForm);
departmentRouter.post("/add", addDep);

// departmentRouter.get('/delete',async(req,res)=>{
//     await department.deleteMany()
//     res.redirect('/departments')
// })

export default departmentRouter;