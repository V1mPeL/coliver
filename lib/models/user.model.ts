import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    // id: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   default: () => new mongoose.Types.ObjectId().toString(),
    // },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    profile_image: {
      type: String,
      default: '',
    },
    listings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing',
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
