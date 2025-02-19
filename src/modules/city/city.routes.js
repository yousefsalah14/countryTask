import { Router } from "express";
import { validation } from "../../middlewares/validation.middleware.js";
import * as  cityController from "./city.controller.js";
import * as  citySchema from "./city.schema.js";
const router = Router();
router.post('/',validation(citySchema.createCity),cityController.createCity)
router.get('/',cityController.getAllCities)
router.get('/:id',validation(citySchema.validateId),cityController.getCityById)
router.get('/state/:id', validation(citySchema.validateId), cityController.getCitiesByState)
router.get('/country/:id', validation(citySchema.validateId), cityController.getCitiesByCountry)
router.patch('/:id', validation(citySchema.updateCity), cityController.updateCity)
router.delete('/:id', validation(citySchema.validateId), cityController.deleteCity)

export default router;