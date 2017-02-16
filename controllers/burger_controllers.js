var express = require("express");

var router = express.Router();

//importing our burger model
var burger = require("../models/burger.js");

//Creating all of our routes

router.get("/", function(req, res){
    burger.selectAll(function(data){
        var hbsObject = {
            burger: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/", function(req, res){
    burger.insertOne([
        "burger_name"
    ], [
        req.body.burger_name
    ], function(){
        res.redirect("/")
    }); 
});

router.put("/:id?", function(req, res){
    var condition = `id = ${req.params.id}`;

    console.log("Condition", condition);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function() {
        res.redirect("/");
    });
});

module.exports = router;