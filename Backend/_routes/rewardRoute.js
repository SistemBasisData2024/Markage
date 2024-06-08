const express = require("express");
const rewardController = require("../_controllers/rewardController");
const rewardRouter = express.Router();

rewardRouter.get("/",rewardController.getAllRewards);
rewardRouter.post("/",rewardController.addReward);
rewardRouter.put("/:id",rewardController.updateReward);
rewardRouter.delete("/:id",rewardController.deleteReward);

module.exports = rewardRouter;
