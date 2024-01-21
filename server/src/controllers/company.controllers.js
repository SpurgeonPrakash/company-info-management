const Company = require("../models/company.model");
const Office = require("../models/offices.model");

exports.createCompany = async (req, res, next) => {
  const { name, address, revenue } = req.body;
  const phone = {
    countryCode: req.body.countryCode,
    number: req.body.phoneNumber,
  };

  let existingCompany;
  try {
    existingCompany = await Company.findOne({ name });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }

  if (existingCompany) {
    const err = new Error("Company Already exists, Please try another name.");
    err.statusCode = 401;
    return next(err);
  }

  const company = new Company({
    name,
    address,
    revenue,
    phone,
  });

  let savedCompany;
  try {
    savedCompany = await company.save();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
  res.status(201).json({
    message: `Company ${name} was created successfully`,
    _id: savedCompany._id,
  });
};

exports.getAllCompanies = async (req, res, next) => {
  let companies;
  try {
    companies = await Company.find({});
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }

  res.status(201).json({
    message: `Companies names were fetched successfully`,
    companies,
  });
};

exports.getCompany = async (req, res, next) => {
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
    const err = new Error("Company Doesn't exists!");
    err.statusCode = 401;
    return next(err);
  }

  res.json({
    message: "Company is fetched successfully",
    company: existingCompany,
  });
};

exports.deleteCompany = async (req, res, next) => {
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
    const err = new Error("Company Doesn't exists!");
    err.statusCode = 401;
    return next(err);
  }

  try {
    await Office.deleteMany({ company: companyId });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }

  try {
    await Company.deleteOne({ _id: companyId });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }

  res.json({
    message: "Company Deleted Successfully",
    companyId,
  });
};
