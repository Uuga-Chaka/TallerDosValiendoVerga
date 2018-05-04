const express = require('express'),
    consolidate = require('consolidate'),
    MongoClient = require('mongodb').MongoClient;

var app = express(),
    db;

var dbName = 'productos';

app.engine('hbs', consolidate.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) throw err;
    db = client.db('text');
    app.listen(1234);
});

app.get('/', (req, res) => {

    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        db.collection(dbName).find(regex).sort().toArray((err, result) => {
            res.render('index', {
                // resultados para pasar al hbs
            });
        });
    }
});
//Pero si hice cambios pendejos
app.post('/get-data', (req, res, next) => {
    var item = {
        title: req.body.title
    }

    db.collection(dbName).insertOne(item, (err, res) => {
        if (err) throw err;
        Console.log("La metio");
        db.close();
    });
    res.redirect('/');
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};