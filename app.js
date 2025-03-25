const path = require("path")
//External module
const express = require("express");

//local module
const {hostRouter} = require("./routes/hostRouter");
const storeRouter = require("./routes/stoerRouter");
const rootDir = require("./utils/pathUtil");

const db = require("./utils/databaseUtil");
const { mongoConnect }= require("./utils/databaseUtil");

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
mongoConnect(client => {
    console.log(client)
    app.listen(port, ()=> {
        console.log(`server running on http://localhost:${port}`)
    })
})
