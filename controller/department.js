import department from "../models/department.js";

export const addDepForm = async (req, res) => {
  res.render("department/department");
};

export const addDep = async (req, res) => {
  const { name, code } = req.body;
  await department.create({
    name,
    code,
  });
  res.redirect("/departments");
};

export const index = async (req, res) => {
  const departments = await department.find().lean();

  res.render("department/listDepartment", { departments });
};
