import {Schema, model} from 'mongoose';

const ItemSchema = new Schema({
  name: {type: String, required: true, maxLength: 20},
  description: {type: String, required: true, maxLength: 100},
  category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
  price: {type: Schema.Types.Decimal128, required: true},
  number_in_stock: {type: Number, required: true},
});

ItemSchema.virtual('url').get(() => `/items/${_id}`);

const Item = model('Item', ItemSchema);
export default Item;
