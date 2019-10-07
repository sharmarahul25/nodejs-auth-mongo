mongoose = require('mongoose');
minute = require('mongoose-minute');
validate = require('mongoose-validator');

UserSchema = new mongoose.Schema({
  firstName:{
      type: String,
      required: true
    },
  lastName: {
    type: String,
    required: false
    },
  email:{
    type: String,
    required: true,
    unique: true,
    validate: [
      validate({
        validator: 'isEmail'
      })
    ]
  },
  password:{
    type: String,
    required: false
  }
});

minute(UserSchema, {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
});

alterDoc = (doc, ret) =>{
  if (ret && ret.password){
    delete ret['password'];
    return ret
  }
};

// ensure password field does not get accepted from requests
UserSchema.set('toObject', {
  virtuals: true,
  transform: alterDoc
});
// ensure password field does not get sent as part of response
UserSchema.set('toJSON', {
  virtuals: true,
  transform: alterDoc
});

Users = mongoose.model('User', UserSchema);
module.exports = Users;
