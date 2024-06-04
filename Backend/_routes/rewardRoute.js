const express = require("express");
const rewardController = require("../_controllers/rewardController");
const rewardRouter = express.Router();

rewardRouter.get("/getAllRewards",rewardController.getAllRewards);
rewardRouter.post("/addReward",rewardController.addReward);
rewardRouter.put("/updateReward",rewardController.updateReward);
rewardRouter.delete("/deleteReward",rewardController.deleteReward);

module.exports = rewardRouter;
