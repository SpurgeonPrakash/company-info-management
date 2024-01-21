const express = require("express");

const officeRoutes = express.Router();

const {
  createOffice,
  getAllOffices,
  getAllCompanyOffices,
  deleteOffice,
} = require("../controllers/office.controller");

officeRoutes.post("/", createOffice);
officeRoutes.get("/", getAllOffices);
officeRoutes.delete("/:officeId", deleteOffice);
officeRoutes.get("/company/:companyId", getAllCompanyOffices);

module.exports = officeRoutes;
