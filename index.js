const express = require('express'),
    consolidate = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
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

    if (req.query.color) {
        console.log("color");
        prod.filter({
            color: req.query.color
        });
    }

    if (req.query.year) {
        console.log("year");
        prod.filter({
            year: parseInt(req.query.year)
        });
    }

    if (req.query.producto) {
        prod.filter({
            object: req.query.producto
        });
    };

    if (req.query.page)
        page = parseInt(req.query.page);
    else
        page = 1;

    var numItems = prod.count();

    numItems.then((value) => {
        var n = pageSize * page;

        prod.skip(n).limit(pageSize);
        prod.toArray((err, result) => {
            console.log(value);
            res.render('index', {
                // resultados para pasar al hbs
                titulo: 'Filtrado de cositas ricas',
                year: req.query.year,
                color: req.query.color,
                productos: result,
                pagess: value,
                np: Math.ceil((value / 20))
            });
        });
    });

    console.log(numItems);
    /*
        prod.count((count) => {
            const contar = count;
            prod.skip((pageSize * page) - pageSize).limit(pageSize).toArray((err, result) => {
                if (err) return next(err);
                var urll = toString(req.originalUrl);
                res.render('index', {
                    titulo: "Filtrado de cositas ricas",
                    year: req.query.year,
                    current: "20",
                    color: req.query.color,
                    productos: result,
                    np: Math.ceil((contar / 20)),
                    url: "Holita"
                });
                console.log(req.originalUrl);
            });
        });*/
});


//Pero si hice cambios pendejos
app.get("/checkout", (req, res) => {
    res.render("checkout");
});

app.get('/productosPorIds', (req, res) => {
    console.log(req.query.ids);
    var arreglo = req.query.ids.split(',');
    arreglo = arreglo.map(function (id) {
        return new ObjectID(id);
    });
    var prod = db.collection(dbName)
        .find({
            _id: {
                $in: arreglo
            }
        })
        .toArray((err, result) => {
            res.send(result);
        });
});

app.get('/producto/:id', (req, res) => {

    var id = req.params.id;
    db.collection(dbName).find({
        "_id": ObjectID(id)
    }).toArray((err, result) => {
        console.log(result);
        res.render("producto", {
            object: result[0].object,
            color: result[0].color,
            year: result[0].year,
            price: result[0].price,
            inches: result[0].inches
        });
    });
});


exhbs.registerHelper('times', (n, block) => {
    var accum = "";
    parseInt(n);
    for (var i = 1; i < n + 1; i++) {
        accum += block.fn(i);
    }
    return accum;
});



app.listen(1236, () => {
    console.log("Escuchando en el puerto 1236");
});