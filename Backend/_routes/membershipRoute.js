const express = require("express");
const memberController = require("../_controllers/membershipController");
const memberRouter = express.Router();


memberRouter.get('', memberController.getAllMemberships);
memberRouter.get('/:id', memberController.getMembershipById);
memberRouter.get('/phone', memberController.getMembershipByTelephone);
memberRouter.post('', memberController.addMembership);
memberRouter.put('/:id', memberController.updateMembership);
memberRouter.delete('/:id', memberController.deleteMembership);

module.exports = memberRouter;