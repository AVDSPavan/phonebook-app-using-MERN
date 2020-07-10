const mongoose = require('mongoose')
var userSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true,
        unique:true
      },
      dob: {
        type: Date,
      },
      mobile:{
          type:String,
          maxlength:13,
          required:true,
          unique:true,
      },
      email: {
        type: String,
        trim: true,
        required: true,
        unique: true
      },
    },{ timestamps: true }
  );

module.exports = mongoose.model("User",userSchema);