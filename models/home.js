const { getDB } = require("../utils/databaseUtil");
const {ObjectId} = require('mongodb');

module.exports = class Home {
    constructor(houseName, price, location, rating, photoUrl, _id) {
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.photoUrl = photoUrl;
        this.rating = rating;
        if (_id) {
            this.id = _id;
        }
    }

    save() {
        const db = getDB();
        //for update
        if(this._id) {
            const updateFields = {
                houseName: this.houseName,
                price: this.price,
                location: this.location,
                photoUrl: this.photoUrl ,
                rating: this.rating 
            };
            return db.collection('homes').updateOne({_id: new ObjectId(String(this._id))}, {$set: updateFields})
        }
        else {
            return db.collection('homes').insertOne(this);
        }
    }

    static fetchAll() {
        const db = getDB();
        return db.collection('homes').find().toArray();
    }

    static findById(homeId) {
        const db = getDB();
        return db.collection('homes').find({ _id: new ObjectId(String(homeId)) }).next();
    }

    static deleteById(homeId) {
        const db = getDB();
        return db.collection('homes').deleteOne({ _id: new ObjectId(String(homeId)) }).next();
    }
};

