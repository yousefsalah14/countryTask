import { Country } from "../../../DB/models/country.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import cloudinary from "../../utils/cloud.js";

export const createCountry  = asyncHandler(async (req, res, next) => {
    const {name } = req.body;
    const countryExist = await Country.findOne({
        name
    });
    if(countryExist){
        return next(new Error("Country already exist",{cause:400}))
    }
    if(!req.file){
        return next(new Error("Flag is required",{cause:400}))
    }
    const {secure_url}= await cloudinary.uploader.upload(req.file.path)
    const country = await Country.create({
        name,
        flag:secure_url
    })
    return res.json({ success:true, message:"Country Created Successfully " , country });
});
export const getAllCountries  = asyncHandler(async (req, res, next) => {
    const countries = await Country.find();
    if(countries.length === 0) return next(new Error("No Country Found",{cause:404})) 
    return res.json({ success: true ,  countries });
});
export const getCountryById  = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const country = await Country.findById(id);
    if(!country) return next(new Error("Country not found",{cause:404}))
    return res.json({ success: true , country });
});
export const updateCountry = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let updateData = {};

    if (req.body.name) {
        updateData.name = req.body.name;
    }

    if (req.file) {
        const { secure_url } = await cloudinary.uploader.upload(req.file.path);
        updateData.flag = secure_url;
    }
    const country = await Country.findByIdAndUpdate(id, updateData, { new: true });
    if(!country) return next(new Error("Country not found",{cause:404}))
    return res.json({ success: true , message : " Country Updated Successfully " ,country })
});
export const deleteCountry = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const country = await Country.findByIdAndDelete(id);
    if(!country) return next(new Error("Country not found",{cause:404}))
    return res.json({ success: true , message :" Country Deleted Successfully "  })
});