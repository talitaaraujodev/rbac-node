import yup from "./validator";

const userAuthValidator = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().max(70).min(8).required(),
});
export default userAuthValidator;
