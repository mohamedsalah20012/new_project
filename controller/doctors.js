import subject from "../models/subject.js";

export const show = async (req, res) => {
  const { id } = req.params;

  const subjects = await subject.find({
    doctor:req.cookies?._id
  }).lean();

  console.log(req.cookies)
  console.log('subjects',subjects)
  res.render("doctor/doctor", { subjects });
};



export const uploadForm = async(req,res) => {
const {id} = req.params
res.render('doctor/uploadFile',{id})

  
}
