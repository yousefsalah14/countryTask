import { Country } from "../../../DB/models/country.model.js";
import { State } from "../../../DB/models/state.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const createState  = asyncHandler(async (req, res, next) => {
    const { name, country } = req.body;
    const countryExist = await Country.findById(country);
    if (!countryExist) return next(new Error(" Country Not Found  ", { cause: 404 }));
    const ststeExist = await State.findOne({name,country});
    if(ststeExist) return next(new Error("State already exist",{cause:400}))
    const state = await State.create({
        name,
        country
    })
    return res.json({ success: true, message:"State Created Succssfully" ,state });
});
export const getStates  = asyncHandler(async (req, res, next) => {
    const states = await State.find().populate("country"); 
    if(states.length === 0) return next(new Error("States Not Found",{cause:404}))
    return res.json({ success: true, states });

});
export const  getStatesBlongsToCoutnry = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const CountryExist = await Country.findById(id);
    if(!CountryExist) return next(new Error("Country Not Found",{cause:404}))
    const states = await State.find({  country : id }).populate("country");
    if(states.length === 0) return next(new Error("States Not Found",{cause:404}))
    return res.json({ success: true, states });
});
export const deleteState = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const stateExist = await State.findByIdAndDelete(id);
    if (!stateExist) return next(new Error("State Not Found",{cause:404}))
        res.json({ success: true, message: "State Deleted Successfully" });
});
export const stateById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const state = await State.findById(id).populate("country");
    if (!state) return next(new Error("State Not Found",{cause:404}))
    return res.json({ success: true, state });
});
export const updateState  = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name, country } = req.body;
    const state = await State.findByIdAndUpdate(id
        , { name, country }, { new: true });
    if (!state) return next(new Error("State Not Found",{cause:404}))
    return res.json({ success: true, message: "State Updated Successfully", state });
});