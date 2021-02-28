import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import mongooseHidden from 'mongoose-hidden'
import uniqueValidator from 'mongoose-unique-validator'


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: [true, 'Password is required'] },
  image: { type: String, required: true },
  address: { type: String, required: false },
  postCode: { type: String, required: false },
  isAdmin: { type: Boolean, required: false }
})
userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  next()
})
userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compare(password, this.password)
}
userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

// userSchema
//   .pre('validate', function checkPassword(next) {
//     if (this.isModified('password') && (this.password !== this._passwordConfirmation)) {
//       this.invalidate('passwordConfirmation', 'This must match your password')
//     }
//     next()
//   })

userSchema.plugin(uniqueValidator)
userSchema.plugin(mongooseHidden({ defaultHidden: { password: true } }))

export default mongoose.model('User', userSchema)
