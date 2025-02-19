import { model, Schema } from 'mongoose';

const countrySchema = new Schema({
  name: { type: String, required: true },
  flag: { type: String, required: true },
},{ timestamps: true });

export const Country = model('Country', countrySchema);
