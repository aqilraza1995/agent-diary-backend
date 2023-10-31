import Joi from "@hapi/joi";

const agentJoiValidation = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.min": "Agent must be greater than 3 character",
    "string.empty": "Please enter agent name",
  }),
  contact: Joi.string()
    .min(10)
    .max(10)
    .pattern(new RegExp(/[6-9]{1}[0-9]{9}/))
    .required()
    .messages({
      "string.min": "Contact number must be 10 digits",
      "string.max": "Contact number must be 10 digits",
      "string.empty": "Please enter contact number",
      "string.pattern.base":"Invalid contact number"
    }),
    partyId:Joi.string().required().messages({'string.empty':'Please select party'})
});

export default agentJoiValidation;
