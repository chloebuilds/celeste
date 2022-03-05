import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

// SCHEMA

// We're only defining the first three, not passwordConfirmation. 
// Because this would be duplicate info, that we only need for validation
const { Schema } = mongoose
const userSchema = new Schema({
  username: { type: String, required: true, unique: true, maxlength: 30 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user'}, //enum means only these values are allowed to populate the role
  registeredAt: {type: Date, default: Date.now}
})

// creating our passwordConfirmation virtual field
// virtual means it wont be saved to the database, it's a temporary field
userSchema
  .virtual('passwordConfirmation')
  .set(function(passwordConfirmation){
    this.passwordConfirmation = passwordConfirmation
  })

  // STEPS OF VALIDATION

  // ? using the lifecycle validate method, check the password matches the confirmation
// method .pre() on the userSchema or any Schema instance, allows us to add extra steps of validation
  userSchema
    .pre('validate', function(){
      // check that the password is being modified/created
      // check passwordConfirmation matches password
      if (this.isModified(password) && (this.password !== this._passwordConfirmation)) {
        // throw a validation error - invalidate and show a message
        this.invalidate('passwordConfirmation', 'Does not match password field.')
      }
      next() //if password is not being modified or password matches passwordConfirmation, move to next stage of validation
    })

    // Unique validator
    userSchema.plugin(uniqueValidator)

    // Define and export our model
    export default mongoose.model('User', userSchema)