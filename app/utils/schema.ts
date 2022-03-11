import * as yup from "yup";

const schemas = {
  firstname: yup
    .string()
    .required("You must enter your firstname")
    .min(3)
    .max(20),
  lastname: yup.string(),
  email: yup.string().email().required("You must provide an email"),
  password: yup
    .string()
    .required("You must provide your password")
    .matches(
      /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
      "Should have at least 8 characters, with one capital letter and one number."
    ),
  password_min: yup.string().required("You must provide your password"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  code : yup.number().min(100000).max(999999)
};

export default schemas;
