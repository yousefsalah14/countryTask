import { model, Schema, Types } from 'mongoose';

const stateSchema = new Schema({
  name: { type: String, required: true },
  country: { type: Types.ObjectId , ref: 'Country', required: true },
},{ timestamps: true });

export const State = model('State', stateSchema);
