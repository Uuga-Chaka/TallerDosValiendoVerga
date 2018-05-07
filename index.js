const express = require('express'),
    consolidate = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    app = express();

var db;

var dbName = 'productos';

app.engine('hbs', consolidate.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) throw err;
    db = client.db('test');
});

app.get('/', (req, res) => {

    // if (req.query.search) {
    //const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    db.collection(dbName)
        .find({
            "precio": { 
                $lt: 500000
            }
            
        },{
            projection:{
                nombre:1,
                'name.common':1,
                _id:0
            }
        }).sort()
        .toArray((err, result) => {
            console.log(result);
            res.render('index', {
                // resultados para pasar al hbs
                nombre: result
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

app.listen(1234, () => {
    console.log("Escuchando en el puerto");
});