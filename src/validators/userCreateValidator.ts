import yup from "./validator";

const userCreateValidator = yup.object().shape({
  name: yup.string().max(200).min(5).required(),
  email: yup.string().email().required(),
  password: yup.string().max(70).min(8).required(),
});
export default userCreateValidator;
