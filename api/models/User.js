const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  UserName: {
    type: String,
    required: true,
    min: 4,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
});
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
