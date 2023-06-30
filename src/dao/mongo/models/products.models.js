const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productsColection = "product";

const productSchema = mongoose.Schema({
  type: {
    type: String,
    enum: [
      "Pañal",
      "Oleo",
      "Toallitas humedas",
      "Algodon",
      "Apositos",
      "Protectores mamarios",
      "Toallitas femeninas",
    ],
    default: "undefined",
  },
  brand: {
    type: String,
    enum: [
      "Babysec",
      "Pumppers",
      "Huguies",
      "Doncella",
      "Estrella",
      "Ladysoft",
    ],
    default: "undefined",
  },
  size: {
    type: String,
    enum: ["undefined", "RN", "RN+", "P", "M", "G", "XG", "XXG"],
    default: "undefined",
  },
  name: String,
  description: String,
  img: String,
  unitPrice: Number,
  boxQuantity: Number,
  stock: Number,
  salePrice:Number
});

mongoose.plugin(mongoosePaginate);

const Product = mongoose.model(productsColection, productSchema);
module.exports = Product;
