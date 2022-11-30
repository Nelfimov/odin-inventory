import {Schema, model} from 'mongoose';

const ItemSchema = new Schema({
  name: {type: String, required: true, maxLength: 20},
  description: {type: String, required: true, maxLength: 100},
  category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
  price: {type: Schema.Types.Decimal128, required: true},
  number_in_stock: {type: Number, required: true},
});

// Virtual for item's URL
ItemSchema.virtual('url').get(() => `/catalog/item/${_id}`);

// Export model
const Item = model('Item', ItemSchema);
export default Item;
