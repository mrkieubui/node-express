var express = require("express");
var bodyParser = require('body-parser');
var multer = require("multer");

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

// Cau hinh ejs
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(3000);

// Routes
app.get("/tintuc", function (req, res) {
    res.send("<font color=red>Hello Thanh Bui!</font>")
});
app.get("/tintuc/:id", function (req, res) {
    var id = req.params.id;
    res.send("Server nhan duoc id = " + id);
});

app.post("/tintuc", function (req, res) {
    res.send("<font color=red> POST Hello Thanh Bui!</font>");
});
app.post("/tintuc", urlencodedParser, function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    res.send("POST Tin tuc Thanh Bui! Username: " + username + " and Password: " + password);
});

app.get("/index", function(req, res) {
    res.render("index");
});
app.get("/chitiet", function(req, res) {
    res.render("chitiet", { hoten: "Bui Van Thanh"});
});

// Cau hinh Upload file

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './upload')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
});
var upload = multer({storage: storage});


app.post("/upload", upload.single('file'), function(req, res){
    console.log(req.file);
    res.send("UPLOAD FILE THANH CONG");
});
app.get("/upload", function(req, res) {
    res.render("form");
});