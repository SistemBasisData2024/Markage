const express = require("express");
const memberController = require("../_controllers/membershipController");
const memberRouter = express.Router();


memberRouter.get('', memberController.getAllMemberships);
memberRouter.get('/phone', memberController.getMembershipByTelephone);
memberRouter.post('', memberController.addMembership);
memberRouter.get('/:id', memberController.getMembershipById);
memberRouter.put('/:id', memberController.updateMembership);
memberRouter.delete('/:id', memberController.deleteMembership);

module.exports = memberRouter;