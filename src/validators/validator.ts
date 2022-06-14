import * as yup from "yup";

yup.setLocale({
  mixed: {
    default: "� inv�lido",
    required: "� um campo obrigat�rio",
    oneOf: "deve ser um dos seguintes valores: ${values}",
    notOneOf: "n�o pode ser um dos seguintes valores: ${values}",
  },
  string: {
    length: "deve ter exatamente ${length} caracteres",
    min: "deve ter pelo menos ${min} caracteres",
    max: "deve ter no m�ximo ${max} caracteres",
    email: "tem o formato de e-mail inv�lido",
    url: "deve ter um formato de URL v�lida",
    trim: "n�o deve conter espa�os no in�cio ou no fim.",
  },
  number: {
    min: "deve ser no m�nimo ${min}",
    max: "deve ser no m�ximo ${max}",
    lessThan: "deve ser menor que ${less}",
    moreThan: "deve ser maior que ${more}",
    positive: "deve ser um n�mero pos�tivo",
    negative: "deve ser um n�mero negativo",
    integer: "deve ser um n�mero inteiro",
  },
  date: {
    min: "deve ser maior que a data ${min}",
    max: "deve ser menor que a data ${max}",
  },
  array: {
    min: "deve ter no m�nimo ${min} itens",
    max: "deve ter no m�ximo ${max} itens",
  },
});

export default yup;
