const express = require("express");
const storeRouter = express.Router();

const storeController = require("../controller/storeController")

storeRouter.get("/",storeController.getIndex);
storeRouter.get("/homes", storeController.getHomes)
storeRouter.get("/bookings", storeController.getBookings);
storeRouter.get("/favrouites", storeController.getFavList)

storeRouter.get("/homes/:homeId", storeController.getHomeDetails);
storeRouter.post("/favrouites", storeController.postAddToFavrouites);

storeRouter.post("/favrouites/delete/:homeId", storeController.postDeleteFromFavrouites);

module.exports = storeRouter;