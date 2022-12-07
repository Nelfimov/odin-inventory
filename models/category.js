/* eslint-disable no-invalid-this */
import {Schema, model} from 'mongoose';

const CategorySchema = new Schema({
  name: {type: String, required: true, maxLength: 20},
  description: {type: String, required: true, maxLength: 100},
});

CategorySchema.virtual('url').get(
    () => `/categories/${this.name.toLowerCase()}`,
);

const Category = model('Category', CategorySchema);
export default Category;
