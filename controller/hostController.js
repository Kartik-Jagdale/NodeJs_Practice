const Home = require("../models/home")

exports.getAddHome = (req, res, next) => {
    res.render('host/addHome', {
        pageTitle: 'Add Home to airbnb',
        currentPage: 'AddHome',
    });
}

exports.postAddHome = (req, res, next) => {
    console.log('Home Registration successful for: ', req.body)
    const {houseName, price, location, rating, photoUrl} = req.body;
    const home = new Home(houseName, price, location, rating, photoUrl);
    home.save();

    res.render("host/homeAdded", {
        pageTitle: 'Home Added Sucessfully',
        currentPage: "homeAdded",
    });
}

exports.getHostHome = (req, res, next) => {

    const registeredHomes = Home.fetchAll()
        res.render('host/host-home-list', {
            registeredHomes: registeredHomes,
            pageTitle: 'airbnb Home',
            currentPage: 'Home'
        });


}