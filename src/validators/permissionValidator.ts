import yup from "./validator";

const permissionValidator = yup.object().shape({
  name: yup.string().required(),
  descricao: yup.string().max(70).min(8).required(),
  permissions: yup.array().required(),
});
export default permissionValidator;
