const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

UserSchema.plugin(mongooseDelete, { overrideMethods: 'all' });

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;
