import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^\+?\d{10,15}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },

    city: {
      type: String,
      trim: true,
    },
    course: {
      type: String,
      trim: true,
    },
    source: {
      type: String,
      required: false,
      trim: true,
      default: "unknown",
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;
