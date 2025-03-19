const express = require("express");
const storeRouter = express.Router();

const homeController = require("../controller/storeController")

storeRouter.get("/",homeController.getIndex);
storeRouter.get("/homes", homeController.getHomes)
storeRouter.get("/bookings", homeController.getBookings);
storeRouter.get("/favrouites", homeController.getFavList)
storeRouter.get("/index", homeController.getIndex);

module.exports = storeRouter;