const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [EMAIL_PATTERN, "Email has to be valid"]
    },
    name: {
      type: String,
      required: [true, "Name is required"]
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must have at least 8 characters"]
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => { // usamos transform para cambiar el objeto y devolver uno nuevo antes de guardarlo en mongoose 
        // doc es el nuevo usuario, el cual es un objeto, antes de guardarlo en mongoose
        // ret es el nuevo objeto que se guardará en mongoose, pero que conserva información del objeto original
        delete ret.password
        delete ret.__v
        return ret
      }
    }
  }
)

userSchema.virtual("movies", {
  ref: "Movie",
  localField: "_id",
  foreignField: "user",
  justOne: false,
})


userSchema.pre("save", function(next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, SALT_ROUNDS)
      .then(hash => {
        this.password = hash
        next()
      })
  } else {
    next()
  }
})

userSchema.methods.checkPassword = function(passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password)
}

const User = mongoose.model("User", userSchema);
module.exports = User