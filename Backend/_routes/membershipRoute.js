const express = require("express");
const membershipController = require("../_controllers/membershipController");
const membershipRouter = express.Router();

membershipRouter.get("/getAllMemberships",membershipController.getAllMemberships);
membershipRouter.get("/getMembershipById/:id",membershipController.getMembershipById);
membershipRouter.get("/getMembershipByTelephone/:telephone",membershipController.getMembershipByTelephone);
membershipRouter.post("/addMembership",membershipController.addMembership);
membershipRouter.put("/updateMembership",membershipController.updateMembership);
membershipRouter.delete("/deleteMembership",membershipController.deleteMembership);

module.exports = membershipRouter;