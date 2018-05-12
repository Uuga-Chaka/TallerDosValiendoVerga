const express = require('express'),
    consolidate = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    app = express();

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

app.get('/', (req, res) => {
    var page;

    // if (req.query.search) {
    //const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    var prod = db.collection(dbName).find();
    if (req.query.color)
        prod.filter({
            color: req.query.color
        });

    if (req.query.page)
        page = req.query.page;
    else
        page = 1;

        //console.log(page);

    prod.skip(pageSize * (page)).limit(pageSize);


    prod.toArray((err, result) => {
       // console.log(result);
        res.render('index', {
            // resultados para pasar al hbs
            titulo: 'Filtrado de cositas ricas',
            productos: result
        });
    });
    // }
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

app.listen(1235, () => {
    console.log("Escuchando en el puerto");
});