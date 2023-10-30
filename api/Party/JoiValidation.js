// const Joi = require("joi");
import Joi from "@hapi/joi"

const partyValidationSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.empty": "Please enter party name.",
    "string.min": "Party name must be greater than 3 character",
  }),
  contact: Joi.string()
    .min(10)
    .max(10)
    .pattern(new RegExp(/[6-9]{1}[0-9]{9}/))
    .required()
    .messages({
      "string.min": "Contact number must be 10 digits",
      "string.max": "Contact number must be 10 digits",
      "string.pattern.base": "Invalid contact number",
    }),
  address: Joi.string()
    .min(3)
    .required()
    .messages({
      "string.empty": "Please enter address",
      "string.min": "Address must be greater than 3 character"
    })
});

export default partyValidationSchema
