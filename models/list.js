const mongoose = require('mongoose');


const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    shop: {
        type: String,
        required: true,
        enum: ['Roda', 'Gomex']
    },
    items: {
        type: [String]
    }
},
{
    timestamps: true
}
)

const List = mongoose.model('List', listSchema);

module.exports = List;