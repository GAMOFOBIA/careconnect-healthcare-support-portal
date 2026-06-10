const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    skills: {
      type: String,
      required: [true, 'Skills are required'],
      trim: true,
    },
    availability: {
      type: String,
      required: [true, 'Availability is required'],
      trim: true,
    },
    motivation: {
      type: String,
      required: [true, 'Motivation is required'],
      trim: true,
    },
    summary: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Volunteer', volunteerSchema);
