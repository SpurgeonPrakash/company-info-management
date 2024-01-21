const Company = require("../models/company.model");
const Office = require("../models/offices.model");

exports.createOffice = async (req, res, next) => {
  const { name, latitude, longitude, officeStartDate, company } = req.body;

  let existingCompany;
  try {
    existingCompany = await Company.findOne({ _id: company });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }

  if (!existingCompany) {
    const err = new Error("Company Doesn't exists");
    err.statusCode = 401;
    return next(err);
  }

  let existingOffice;
  try {
    existingOffice = await Office.findOne({ name, company });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }

  if (existingOffice) {
    const err = new Error("Office Already exists, Please try another name.");
    err.statusCode = 401;
    return next(err);
  }

  const office = new Office({
    name,
    location: {
      latitude,
      longitude,
    },
    officeStartDate,
    company,
  });

  try {
    await office.save();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }

  res.status(201).json({
    message: `Office ${name} was created successfully`,
  });
};

exports.getAllOffices = async (req, res, next) => {
  let offices;
  try {
    offices = await Office.find({});
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }

  res.status(201).json({
    message: `Offices were fetched successfully`,
    offices,
  });
};

exports.getAllCompanyOffices = async (req, res, next) => {
  const { companyId } = req.params;

  let existingCompany;
  try {
    existingCompany = await Company.findOne({ _id: companyId });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }

  if (!existingCompany) {
    const err = new Error("Company Doesn't exists");
    err.statusCode = 401;
    return next(err);
  }

  let companyOffices;
  try {
    companyOffices = await Office.find({ company: companyId });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }

  res.json({
    message: "Company Offices fetched Successfully",
    offices: companyOffices,
  });
};

exports.deleteOffice = async (req, res, next) => {
  const { officeId } = req.params;

  try {
    await Office.deleteOne({ _id: officeId });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }

  res.json({
    message: "Company Deleted Successfully",
    officeId,
  });
};
