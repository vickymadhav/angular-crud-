var app = require('express')();
var mongo = require('mongodb').MongoClient;
var mongoose = require('mongoose');

app.post('/signup', function (req, res) {

    var obj = {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        url: req.body.url,
        date: req.body.date,
        description: req.body.description,
        password: req.body.password,

    };
    mongo.connect("mongodb://localhost:27017/users", function (err, db) {
        if (err) throw err;
        db.collection('data').insert(obj, function (err, res) {
            if (err)
                console.log.apply(err);
            console.log("successfully inserted");
        })
        res.send("inserted");
    });
});

app.post('/signin', function (req, res) {
    var name = req.body.Name;
    var password = req.body.password;
    console.log(name);

    mongo.connect("mongodb://localhost:27017/users", function (err, db) {

        if (!err) {
            db.collection('data').find({ name: name, password: password }).toArray(function (err, result) {

                console.log(result);
                if (err || result.length <= 0)
                    console.log('invalid user');
                else
                    res.send(result);
                console.log("successful login");
                
            })


        }
    })
})
app.get('/data', function (req, res) {
    mongo.connect("mongodb://localhost:27017/users", function (err, db) {
        if (err) throw err;
        console.log("mongo is connected");
        db.collection('data').find({}).toArray(function (err, sample) {
            if (err) throw err;
            console.log(sample);
            res.send(sample);
        });
    });
});

app.delete('/data/:name', function (req, res) {
    console.log("name is" + req.params.name);
    var name = req.params.name;
    console.log("param is" + name)
    mongo.connect("mongodb://localhost:27017/users", function (err, db) {
        console.log("before");
        db.collection('data').deleteOne({ name: name }, function (err, result) {
            if (err) throw err;
            console.log("result is" + result)

            db.collection('data').find({}).toArray(function (err, data) {
                if (err) throw err;
                console.log('mongo connected');
                console.log(data);
                res.send(data);
            });

        });

    })
})


app.put('/data/:name', function (req, res) {

    console.log("_id in api to update is" + req.params.name);
    console.log("_id in api to update is" + req.body.email);
    console.log("_id in api to update is" + req.body.mobile);
    console.log("_id in api to update is" + req.body.url);
    console.log("_id in api to update is" + req.body.description);

        mongoose.connect("mongodb://localhost:27017/users", function (err, db) {

        if (err) throw err;

        console.log("connected to db successfully to save update");
        var id = new mongoose.Types.ObjectId(req.params.name);
        console.log(id);
        db.collection('data').find(id).toArray(function (err, data) {
            if (err) throw err;

            console.log(data);
            db.collection('data').update({ '_id': id }, {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    url: req.body.url,
                    date: req.body.date,
                    description: req.body.description,
                    password: req.body.password
                }
            });
            db.collection('data').update({ '_id': id }, { $set: { name: req.body.name,
                                                                 password: req.body.email,
                                                                 password: req.body.mobile,
                                                                 password: req.body.url,
                                                                 password: req.body.description,} });
            res.send(data);
        });
        res.send(res);
        res.send({ message: "successfully registred" });
    });
});
module.exports = app;