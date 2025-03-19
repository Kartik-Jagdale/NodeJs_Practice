const Favrouites = require("../models/favrouites");
const Home = require("../models/home")


exports.getIndex = (req, res, next) => {
    Home.fetchAll((registeredHomes) =>
        res.render("store/index", {
            registeredHomes: registeredHomes,
            pageTitle: "airbnb Home",
            currentPage: "index",
        })
    );
};

exports.getHomes = (req, res, next) => {
    Home.fetchAll((registeredHomes) =>
        res.render("store/home-list", {
            registeredHomes: registeredHomes,
            pageTitle: "Homes List",
            currentPage: "Home",
        })
    );
};

exports.getBookings = (req, res, next) => {
    res.render("store/bookings", {
        pageTitle: "my bookings",
        currentPage: "Bookings"
    })
}

exports.getFavList = (req, res, next) => {
    Favrouites.getFavrouites(favrouites => {
        Home.fetchAll((registeredHomes) => {
            // const favDataList = favrouites.map( homeId => registeredHomes.find(home => home.id === homeId));
            const favDataList = registeredHomes.filter(home => favrouites.includes(home.id));
            res.render("store/fav-list", {
                favrouites: favDataList,
                pageTitle: "my Favourites",
                currentPage: "Favourites"
            })
        })
    })
    
}

exports.getHomeDetails = (req, res, next) => {
    const homeId = req.params.homeId;
    Home.findById(homeId, home => {
        if (!home) {
            console.log("home not found");
            res.redirect("/homes");
        } else {
            res.render("store/home-detail", {
                home: home,
                pageTitle: "Home Detail",
                currentPage: "Home"
            })
        }
    })
};

exports.postAddToFavrouites = (req, res, next) => {
    console.log("came to add favrites", req.body);
    Favrouites.addFavrouites(req.body.id, error => {
        if(error) {
            console.log("Error while marking favrouites"); 
        }
        res.redirect("/favrouites");
    })
}
