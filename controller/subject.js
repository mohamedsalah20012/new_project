import subject from "../models/subject.js";
import department from "../models/department.js";
import user from "../models/user.js";

export const index = async (req, res) => {
  const subjects = await subject.find({}, { name: 1 }).lean();
  // doctor: req.user._id
  res.render("subjects/index", { subjects });
};

export const create = async (req, res) => {
  const departments = await department.find().lean();
  const doctors = await user
    .find({
      userType: "Doctor",
    })
    .lean();
  res.render("subjects/create", { departments, doctors });
};

export const store = async (req, res) => {
  const { name, code, department, doctorId } = req.body;
  await subject.create({
    name,
    code,

    department,
    doctor: doctorId,
  });

  res.redirect("/subjects");
};

export const show = async (req, res) => {
  const { id } = req.params;

  const singleSubject = await subject
    .findById(id)
    .populate("department")
    .lean();

  res.render("subjects/show", { subject: singleSubject });
};

export const deleteOne = async (req, res) => {
  const { id } = req.params;

  await subject.findByIdAndDelete(id);

  return res.redirect("/subjects");
};

export const edit = async (req, res) => {
  const { id } = req.params;

  const editFormSubject = await subject.findById(id).lean();

  const departments = await department.find().lean();
  res.render("subjects/edit", { departments, subject: editFormSubject });
};

export const update = async (req, res) => {
  const { name, code, age, department } = req.body;
  const { id } = req.params;
  await subject.findByIdAndUpdate(id, {
    $set: { name, code, age, department },
  });

  res.redirect("/subjects");
};
