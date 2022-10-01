const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const view = require("./view")
const port = 3000;
mongoose.connect("mongodb://localhost:27017/userDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("connected");
});

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser({ limit: '50mb', keepExtensions: true }));

app.use(express.static("public"));

const newSchema = {
    title: String,
    description: String,
    imgUrl: String,
    CreateBy: String
}

const news = mongoose.model("news", newSchema);

app.post("/news", async (req, res) => {
    console.log(req.body);
    let data = await new news(req.body).save();
    return res.send(view.toModel(data));
})
app.get("/news/:id", async (req, res) => {

    let data = await news.findById(req.params.id);
    return res.send(view.toModel(data));
})
app.get("/news", async (req, res) => {
    let data = await news.find({})
    return res.send(view.toSearchModel(data));
})
app.listen(port, () => {
    console.log(`server is listening ${port}`);
})