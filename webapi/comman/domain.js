// this used for define global domain for all models schemas

let domain = {};
domain.Organization = require("../model/organization");
domain.User = require("../model/user");
module.exports = domain;