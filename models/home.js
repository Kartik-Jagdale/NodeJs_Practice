const db = require("../utils/databaseUtil")

module.exports = class Home {
    constructor(houseName, price, location, rating, photoUrl, id) {
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.photoUrl = photoUrl;
        this.rating = rating;
        this.id = id;
    }

    save() {
        if(this.id) {
            return db.execute('update homes set houseName = ?, price = ?, location = ?, rating = ?, photoUrl = ? where id = ?',[this.houseName,this.price,this.location,this.rating,this.photoUrl, this.id])
        }else{
            return db.execute(`insert into homes (houseName, price, location, rating, photoUrl) values(?,?,?,?,?)`,[this.houseName,this.price,this.location,this.rating,this.photoUrl]);
        }
    }

    static fetchAll() {
        return db.execute("select * from homes");
    }

    static findById(homeId) {
        return db.execute("select * from homes where id=?",[homeId]);
    }

    static deleteById(homeId) {
        return db.execute("delete from homes where id = ?", [homeId]);
    }
};

