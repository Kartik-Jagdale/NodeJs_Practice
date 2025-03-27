const path = require("path")
//External module
const express = require("express");

//local module
const {hostRouter} = require("./routes/hostRouter");
const storeRouter = require("./routes/stoerRouter");
const rootDir = require("./utils/pathUtil");

const db = require("./utils/databaseUtil");
const {default: mongoose} = require('mongoose');

// db.execute('select * from homes').then(([rows, fields]) => {
//     console.log('Getting from db', rows);
// })
// .catch(error => {
//     console.log("error", error);
// })

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(express.urlencoded({ extended: true }));
app.use(storeRouter);
app.use("/host",hostRouter);

app.use(express.static(path.join(rootDir,"public")));

port = 3002;
const dbPath = "mongodb+srv://kartikpucsd2022:kartikpucsd2022@learningmongo.jo5ui.mongodb.net/airbnb?retryWrites=true&w=majority&appName=LearningMongo"

mongoose.connect(dbPath).then(()=>{
    console.log("connected to mongo");
    app.listen(port, ()=> {
        console.log(`server running on http://localhost:${port}`)
    })
}).catch(err => {
    console.log("Error while connecting mongo", err)
})