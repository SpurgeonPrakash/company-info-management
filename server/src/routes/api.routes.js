const express = require("express");
const app = express();

const companyRoutes = require("./company.routes");
const officeRoutes = require("./office.routes");

app.use("/company", companyRoutes);
app.use("/office", officeRoutes);

module.exports = app;
