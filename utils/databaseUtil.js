const mongodb = require("mongodb");

// const mysql = require("mysql2");

// const pool = mysql.createPool(
//     {
//         host: "localhost",
//         user: "root",
//         password: "kartik@123",
//         database: "airbnb"
//     },
// );

// module.exports = pool.promise();

const MongoClient = mongodb.MongoClient;

const MUrl = "mongodb+srv://kartikpucsd2022:kartikpucsd2022@learningmongo.jo5ui.mongodb.net/?retryWrites=true&w=majority&appName=LearningMongo";

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(MUrl).then(client => {
        callback();
        _db = client.db('airbnb')
    }).catch(err => {
        console.log("Error while connnecting mongo", err);
    });
}

const getDB = () => {
    if(!_db){
        throw new Error("Mongon not connected");
    }
    return _db
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;