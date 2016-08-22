var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var UserSchema = new mongoose.Schema({
  firstName : {
    type:String,
    required: [true, "First name is required"],
    trim: true,
    minlength: [2," First name must be atleast 2 letters"]
  },
  lastName : {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    minlength: [2," Last name must be atleast 2 letters"]

  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "Email is required"],
    validate: [validateEmail, 'Email address not valid'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type:String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be longer than 6 characters"],
    maxlength:[20, "Your password must be shorter than 20 characters"],
    validate: {
      validator: function(value){
        var confirm = new RegExp(value)
        return confirm.test(this.re_password)
      },
      message: "Password and confirm password fields must match"
    }
  },
  re_password: {
    type:String,
    required: [true, "Confirm password field is required"],
  },
  birthDate:{
    type: Date,
    required: [true, "Birthdate is required"]
  }

},{timestamps:true})

UserSchema.pre('save', function(done){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
    this.re_password = '';
    done()
});


var User = mongoose.model('User', UserSchema)