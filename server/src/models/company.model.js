const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide company name"],
      trim: true,
      maxlength: [50, "Company Name can not be more than 50 characters"],
    },
    address: {
      type: String,
      required: [true, "Please provide company address"],
      trim: true,
      maxlength: [150, "Name can not be more than 150 characters"],
    },
    revenue: {
      type: Number,
      required: [true, "Please provide company revenue"],
    },
    phone: {
      countryCode: {
        type: String,
        required: [true, "Please provide companies country code"],
      },
      number: {
        type: String,
        required: [true, "Please provide companies phone number"],
      },
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
