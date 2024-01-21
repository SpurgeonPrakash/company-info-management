const express = require("express");

const companyRoutes = express.Router();

const {
  createCompany,
  getAllCompanies,
  getCompany,
  deleteCompany,
} = require("../controllers/company.controllers");

companyRoutes.post("/", createCompany);
companyRoutes.get("/", getAllCompanies);
companyRoutes.get("/:companyId", getCompany);
companyRoutes.delete("/:companyId", deleteCompany);

module.exports = companyRoutes;
