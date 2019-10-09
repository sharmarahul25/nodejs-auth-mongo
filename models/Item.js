mongoose = require('mongoose');

ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    type: String,
    image:{
        type: String,
        default: ""
    }

});

Items = mongoose.model('Item', ItemSchema);
module.exports = Items;
