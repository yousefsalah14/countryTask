import joi from "joi";
import { objectIdValidation } from '../../middlewares/validation.middleware.js'

export const createCountry = joi.object({
  name: joi.string().required()
}).required();
export const updateCountry = joi.object({
    id: joi.string().custom(objectIdValidation).required(),
  name : joi.string() 
}).required();