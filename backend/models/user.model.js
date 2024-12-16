import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Removes extra spaces
    },
    fullname: {
      type: String,
      required: true,
      trim: true, // Ensures no extra spaces in fullname
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Corrected property name: `minLength` → `minlength`
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [], // This is valid; no changes needed here
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [], // This is valid; no changes needed here
      },
    ],
    profileImg: {
      // Corrected the spelling from `prodileImg` to `profileImg`
      type: String,
      default: "",
    },
    coverImg: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    likedPosts:[
      {
      type:mongoose.Schema.Types.ObjectId,
      ref:"post",
      default:[],
    }
  ],
    },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

const User = mongoose.model("User", userSchema);

export default User;
