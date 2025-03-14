const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const { error } = require("console");

const registeredHomes = [];

module.exports = class Home {
    constructor(houseName, prcie, location, rating, photoUrl){
        this.houseName = houseName;
        this.prcie = prcie;
        this.location = location;
        this.photoUrl = photoUrl;
        this.rating = rating;
    }

    save() {
        registeredHomes.push(this);
        const homeDataPath = path.join(rootDir, 'data', "homes.json");
        fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), error => {
            console.log("file writing Concludeed", error);
        });
    }

    static fetchAll() {
        return registeredHomes;
    }
}