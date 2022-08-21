const joi = require("joi");

const validate = (data) => {
  const schema = joi.object({
    firstName: joi
      .string()
      .min(3)
      .max(25)
      .pattern(/^[a-zA-Z][a-zA-Z][a-zA-Z ]*$/)
      .required()
      .label("First Name"),
    lastName: joi
      .string()
      .min(1)
      .max(25)
      .pattern(/^[a-zA-Z]+$/)
      .required()
      .label("Last Name"),
    email: joi.string().email().required().label("Email"),
    phone: joi
      .string()
      .length(10)
      .pattern(/^\d{10}$/)
      .required()
      .label("Phone"),
    password: joi.allow(),
  });
  return schema.validate(data);
};

module.exports = {
  validate,
};
