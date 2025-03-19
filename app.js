const path = require("path")
//External module
const express = require("express");

//local module
const {hostRouter} = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const storeRouter = require("./routes/stoerRouter");

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(express.urlencoded({ extended: true }));
app.use(storeRouter);
app.use("/host",hostRouter);

app.use(express.static(path.join(rootDir,"public")));

port = 3002;
app.listen(port, ()=> {
    console.log(`server running on http://localhost:${port}`)
})