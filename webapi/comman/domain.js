// this used for define global domain for all models schemas

let domain = {};
domain.Organization = require("../model/organization");
domain.User = require("../model/user");
domain.Project = require("../model/project");
module.exports = domain;