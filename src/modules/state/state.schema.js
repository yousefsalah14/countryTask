import joi from 'joi';
import { objectIdValidation } from '../../middlewares/validation.middleware.js';
export const createState = joi.object({
  name: joi.string().required(),
  country : joi.string().custom(objectIdValidation).required(),
}).required();
export const getStatesBlongsToCoutnry = joi.object({
  id : joi.string().custom(objectIdValidation).required(),
}).required();
export const deleteState = joi.object({
    id : joi.string().custom(objectIdValidation).required(),
}).required();
export const stateById = joi.object({
    id : joi.string().custom(objectIdValidation).required(),
  
}).required();
export const updateState = joi.object({
    id : joi.string().custom(objectIdValidation).required(),
    country : joi.string().custom(objectIdValidation),
    name: joi.string()
}).required();