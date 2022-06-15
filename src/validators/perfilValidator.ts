import yup from "./validator";

const perfilValidator = yup.object().shape({
  name: yup.string().required(),
  descricao: yup.string().max(70).min(8).required(),
});
export default perfilValidator;
