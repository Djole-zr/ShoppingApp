const mongoose = require('mongoose');
const { Schema } = mongoose;


const listSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    shop: {type: Schema.Types.ObjectId, ref: 'Shop'},
    items: [{ type: Schema.Types.ObjectId, ref: 'Item'}]
},
{
    timestamps: true
}
)

const itemSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity required']
    },
    created: {
        type: Date,
        default: Date.now()
    },
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
})

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    description: {
        type: String,
    }

})

const shopSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    address: {
        type: String,
        required: [true, 'Address required']
    },
    city: {
        type: String,
        required: [true, 'City required']
    }

})

const List = mongoose.model('List', listSchema);
const Item = mongoose.model('Item', itemSchema);
const Category = mongoose.model('Category', categorySchema);
const Shop = mongoose.model('Shop', shopSchema);


module.exports = {
    List,
    Item,
    Category,
    Shop
}
