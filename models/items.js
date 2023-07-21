const mongoose = require("mongoose") // Connection to Mongoose
const itemSchema = mongoose.Schema({ // Schema setup
itemName: String,
image: String,
url: String,
price: Number,
dealer: String,
booked: Boolean,
desc:String,
gifter: String,
email: String,
message: String,
category: String
})
const Item = mongoose.model("items", itemSchema) // Creation of the model
module.exports = Item // Exportation of the model