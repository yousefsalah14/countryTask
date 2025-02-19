import joi from "joi";
import { objectIdValidation } from "../../middlewares/validation.middleware.js";

export const createCity = joi.object({
  name: joi.string().required(),
    state: joi.string().custom(objectIdValidation).required(),
}).required();
export const validateId = joi.object({
  id : joi.string().custom(objectIdValidation).required()
}).required();
export const updateCity = joi.object({
    id : joi.string().custom(objectIdValidation).required(),
  name: joi.string(),
    state: joi.string().custom(objectIdValidation)
}).required();