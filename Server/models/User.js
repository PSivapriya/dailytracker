const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true},
  email: {type:String, required:true, unique:true},
  password: { type: String, required: true },
  refreshToken:{type: String}
}, {timestamps: true});

// Password hashing before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password'))
     return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
