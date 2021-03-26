const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
      username: {
          type: String, // data type
          required: true, // not-null
          unique: true, // unique
          trim: true, // removes space around entry
          minlength: 5, // minimum length
    },
      email: { type: String, required: true ,unique: true},
      isVerified: {type: Boolean,default:false},
      password: String,
      waitingForApproval: {type: Boolean, default:false},
      business:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Business"
      },
      roles: [
          {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Role"
          }
      ],
      courseEnrolledIn: [
          {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Course"
          }
      ]

  },
  {
    timestamps: true, // automatically creates fields for creation and modification time
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
