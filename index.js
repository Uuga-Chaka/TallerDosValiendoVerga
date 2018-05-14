const express = require('express'),
    consolidate = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    app = express(),
    exhbs = require('handlebars');

var db;

var pageSize = 20;

var dbName = 'productos';

app.engine('hbs', consolidate.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.use(express.static('public'));

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) throw err;
    db = client.db('test');
});

var items;
app.get('/', (req, res) => {
    var page;
    var prod = db.collection(dbName).find();

    if (req.query.color)
        prod.filter({
            color: req.query.color
        });

    if (req.query.year)
        prod.filter({
            year: parseInt(req.query.year)
        })

    if (req.query.page)
        page = req.query.page;
    else
        page = 1;

    var numItems = prod.count();

    numItems.then(function (value) {

    });


    prod.count((err, count) => {
        const contar = count;
        prod.skip((pageSize * page) - pageSize).limit(pageSize).toArray((err, result) => {
            if (err) return next(err);
            res.render('index', {
                titulo: "Filtrado de cositas ricas",
                year: req.query.year,
                current: "20",
                color: req.query.color,
                productos: result,
                np: Math.ceil(contar / 20)
            });
            console.log(parseInt(Math.ceil(contar / 20)));
        });
    });
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

exhbs.registerHelper('times',(n, block)=>{
    var accum = "";
    parseInt(n);
    for(var i = 0; i<n;i++){
        accum+= block.fn(i);
    }
    return accum;
});


app.listen(1236, () => {
    console.log("Escuchando en el puerto 1236");
});