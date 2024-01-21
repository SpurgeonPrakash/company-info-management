const mongoose = require("mongoose");

const OfficeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide office name"],
      trim: true,
      maxlength: [50, "Office Name can not be more than 50 characters"],
    },
    location: {
      latitude: {
        type: Number,
        required: [true, "Please provide office latitude"],
      },
      longitude: {
        type: Number,
        required: [true, "Please provide office longitude"],
      },
    },
    officeStartDate: {
      type: String,
      required: [true, "Please Choose Office Start Date"],
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  { timestamps: true }
);

const Office = mongoose.model("Office", OfficeSchema);

module.exports = Office;
