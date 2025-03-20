const Home = require("../models/home")

exports.getAddHome = (req, res, next) => {
  res.render('host/edit-home', {
    pageTitle: 'Add Home to airbnb',
    currentPage: 'AddHome',
    editing: false,
  });
}

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';
  Home.findById(homeId, home => {
    if (!home) {
      console.log("home not found");
      res.redirect("/host/host-home-list");
    }
    res.render('host/edit-home', {
      pageTitle: 'Edit your home',
      currentPage: 'host-Home',
      editing: editing,
      home: home,
    });
  });
}


exports.postAddHome = (req, res, next) => {
  console.log('Home Registration successful for: ', req.body)
  const { houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.save();
  res.redirect("host-home-list")
}

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    })
  );
};

exports.postHostHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.id = id;
  home.save();

  res.redirect("/host/host-home-list");
}

exports.postDeleteHome = (req, res, next) => {
    const homeId = req.params.homeId;
    console.log(homeId);
    Home.deleteById(homeId, error => {
      console.log("error")
    })
    res.redirect("/host/host-home-list");
  }