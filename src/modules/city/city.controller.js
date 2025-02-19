import { City } from "../../../DB/models/city.model.js";
import { State } from "../../../DB/models/state.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const createCity  = asyncHandler(async (req, res, next) => {
    const { name, state } = req.body;
    const stateExist = await State.findById(state);
    if (!stateExist) return next({ message:"State not found", cause: 404 })
    const cityExist =  await City.findOne({name})
    if (cityExist) return next({ message: "City already exist", cause: 400 }) 
    const city = await City.create({ name, state });
    return res.status(201).json({ success: true,  city });
});
export const getAllCities = asyncHandler(async (req, res, next) => {
    const cities = await City.find().populate({
        path: 'state',
        populate: { path: 'country' } 
    });

    if (cities.length === 0) return next({ message: "No city found", cause: 404 })
    return res.json({ success: true,  cities });
});
export const getCityById  = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const city = await City.findById(id).populate({ path: 'state', populate: { path: 'country' } });
    if (!city) return next({ message: "City not found", cause: 404 })
    return res.json({ success: true,  city });
});
export const  getCitiesByState = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const cities = await City.find({ state: id }).populate({ path: 'state', populate: { path: 'country' } });
    if (cities.length === 0) return next({ message: "No city found", cause: 404 })
    return res.json({ success: true,  cities });
});
export const  getCitiesByCountry = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const states = await State.find({ country: id }).select('_id');
    if (states.length === 0) return next({ message: "No states found for this country", cause: 404 });
    const stateIds = states.map(state => state._id);

    const cities = await City.find({ state: { $in: stateIds } })
        .populate({
            path: 'state',
            populate: { path: 'country' } 
        });
    if (cities.length === 0) return next({ message: "No cities found for this country", cause: 404 });
    return res.status(200).json({ success: true, cities });
});
export const updateCity  = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const { name, state } = req.body; 
    const city = await City.findByIdAndUpdate(id, { name, state }, { new: true });
    if (!city) return next({ message: "City not found", cause: 404 });
    return res.json({ success: true, message :" City Updated Sucussfully",city });
});
export const deleteCity = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const city = await City.findByIdAndDelete(id);
    if (!city) return next({ message: "City not found", cause: 404 });
    return res.json({ success: true, message: "City deleted successfully" });
});