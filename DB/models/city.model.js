import { model, Schema, Types } from 'mongoose';

const citySchema = new Schema({
  name: { type: String, required: true },
  state : { type: Types.ObjectId , ref: 'State', required: true },
},{ timestamps: true });

export const City = model('City', citySchema);
