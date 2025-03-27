const Favrouites = require("../models/favrouites");
const Home = require("../models/home")


exports.getIndex = (req, res, next) => {
    Home.find().then(registeredHomes => {
        res.render("store/index", {
            registeredHomes: registeredHomes,
            pageTitle: "airbnb Home",
            currentPage: "index",
        });
    });
};

exports.getHomes = (req, res, next) => {
    Home.find().then(registeredHomes => {
        res.render("store/home-list", {
            registeredHomes: registeredHomes,
            pageTitle: "Homes List",
            currentPage: "Home",
        })
    });
};

exports.getBookings = (req, res, next) => {
    res.render("store/bookings", {
        pageTitle: "my bookings",
        currentPage: "Bookings"
    })
}

exports.getFavList = (req, res, next) => {
    Favrouites.find()
        .populate('houseId')
        .then((favrouites) => {
            const favDataList = favrouites.map((fav) => fav.houseId.toString());
                res.render("store/fav-list", {
                    favrouites: favDataList,
                    pageTitle: "my Favourites",
                    currentPage: "Favourites"
                })
            })
}

exports.getHomeDetails = (req, res, next) => {
    const homeId = req.params.homeId;
    Home.findById(homeId).then(home => {
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
    });
};

exports.postAddToFavrouites = (req, res, next) => {
    const homeId = req.body.id;
    Favrouites.findOne({ houseId: homeId }).then((existingFav) => {
        if (existingFav) {
            console.log("already marked as fav")
        }
        else {
            existingFav = new Favrouites({ houseId: homeId });
            existingFav.save().then((result) => {
                console.log("Fav added", result);
            });
        }
        res.redirect("/favrouites")
    }).catch(err => {
        console.log("Error while adding fav", err)
    });
}

exports.postDeleteFromFavrouites = (req, res, next) => {
    const homeId = req.params.homeId;
    Favrouites.findOneAndDelete({ houseId: homeId }).then((result) => {
        console.log("fav removed", result);
    }).catch((err) => {
        console.log("error while removing fav", err);
    })
        .finally(() => {
            res.redirect("/favrouites")
        }
        )
}