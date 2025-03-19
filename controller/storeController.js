const Home = require("../models/home")
exports.getIndex = (req, res, next) => {
    
    const registeredHomes = Home.fetchAll()
        res.render('store/index', {
            registeredHomes: registeredHomes,
            pageTitle: 'Index',
            currentPage: 'Index'
        });    
}

exports.getHomes = (req, res, next) => {

    const registeredHomes = Home.fetchAll();
        res.render('store/home-list', {
            registeredHomes: registeredHomes,
            pageTitle: 'airbnb Home',
            currentPage: 'Home'
        });
}

exports.getBookings = (req, res, next) => {
    res.render("store/bookings", {
        pageTitle: "my bookings",
        currentPage: "Bookings"
    })
}

exports.getFavList = (req, res, next) => {
    res.render("store/fav-list", {
        pageTitle: "my Favourites",
        currentPage: "Favourites"
    })
}