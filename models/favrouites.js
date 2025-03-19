const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const { error } = require("console");

const FavDataPath = path.join(rootDir, 'data', "favrouites.json");

module.exports = class Favrouites {

    static addFavrouites(homeId, callback) {
        Favrouites.getFavrouites((favrouites) => {
            if (favrouites.includes(homeId)) {
                console.log("home is already in fav");
            } else {
                favrouites.push(homeId);
                fs.writeFile(FavDataPath, JSON.stringify(favrouites), callback) 
            }
        });
    }

    static getFavrouites(callback) {
        fs.readFile(FavDataPath, (err, data) => {
            callback(!err ? JSON.parse(data) : []);
        })
    }
};

