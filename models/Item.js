mongoose = require('mongoose');

ItemSchema = new mongoose.Schema({
    ItemName: {
        type: String,
        required: true
    },
    ItemId: {
        type: String,
        required: false
    },
});


Users = mongoose.model('Item', ItemSchema);
module.exports = Users;
