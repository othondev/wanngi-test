const mongoose = require('mongoose')
const Bcrypt = require('bcrypt')
const SALT = 10
const Schema = mongoose.Schema

const crpyt = (password, salt) => Bcrypt.hashSync(password, SALT);

const UserSchema = new Schema({
  login: { type:String, unique: true},
  password: String,
})

UserSchema.pre("save", function(next) {
  if(!this.isModified("password")) {
      return next();
  }
  this.password = crpyt(this.password, SALT);
  next();
});
UserSchema.methods.validatePassword = async (candidatePassword, hash) =>{
  return Bcrypt.compare(hash, candidatePassword)
}

module.exports = mongoose.models.User || mongoose.model('User', UserSchema );