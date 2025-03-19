const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");

const homeDataPath = path.join(rootDir, 'data', "homes.json");

module.exports = class Home {
    constructor(houseName, prcie, location, rating, photoUrl) {
        this.houseName = houseName;
        this.prcie = prcie;
        this.location = location;
        this.photoUrl = photoUrl;
        this.rating = rating;
    }

    save() {
        this.id = Math.random().toString();
        Home.fetchAll((registeredHomes) => {
            registeredHomes.push(this);
            fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (error) => {
                console.log("file writing Concludeed", error);
            });
        });
    }

    static fetchAll(callback) {
        fs.readFile(homeDataPath, (error, data) => {
            callback(!error ? JSON.parse(data) : []);
        });
    }

    static findById(homeId, callback) {
        this.fetchAll(homes => {
            const homeFound = homes.find(home => home.id === homeId);
            callback(homeFound);
        })
    }
};

