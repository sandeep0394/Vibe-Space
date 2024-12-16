import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Corrected to match the registered model name
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Corrected to match the registered model name
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['follow', 'like'], // Ensures type is either 'follow' or 'like'
    },
    read: {
      type: Boolean,
      default: false, // Notifications are unread by default
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
