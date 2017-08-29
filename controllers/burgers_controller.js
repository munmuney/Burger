var express = require("express");
var router = express.Router();

// ---------- Import the model (burger.js) ---------- //
var burger = require("../models/burgers.js");

// ---------- Create routes ---------- //
router.get("/", function(req, res) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };

        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});


router.post("/", function(req, res) {
    burger.create(["name", "devoured"], [req.body.name, req.body.devoured], function() {
        res.redirect("/");
    });
});


router.put("/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("Updating: ", condition);

    burger.update({ devoured: req.body.devoured }, condition, function() {
        res.redirect("/");
    });
});


router.delete("/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("Deleting", condition);

    burger.delete(condition, function() {
        res.redirect("/");
    });
});

// ----- Export routes ----- //
module.exports = router;