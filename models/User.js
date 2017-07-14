const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter your first name!'
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: 'Please enter your email address!',
        validate: [validator.isEmail, 'Invalid Email Address']
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

// Passport-Local Mongoose will add a username,
// hash and salt field to store the username,
// the hashed password and the salt value.
// usernameField: specifies the field name that holds the username.
// Defaults to 'username'. This option can be used if you want to use a different
// field to hold the username for example "email".

// use email address for login or username
// passportLocalMongoose exposes method .register
userSchema.plugin(passportLocalMongoose, { usernameField: 'email'});
 // give nicer error messages than default
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);