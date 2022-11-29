import {Schema, model} from 'mongoose';

const CategorySchema = new Schema({
  name: {type: String, required: true, maxLength: 20},
  description: {type: String, required: true, maxLength: 100},
});

// Virtual for author's URL
CategorySchema.virtual('url').get(() => `/catalog/category/${_id}`);

// Export model
const Category = model('Category', CategorySchema);
export default Category;
