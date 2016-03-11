/**
 * Created by krao on 3/9/2016.
 */

var express = require('express');
var app = express();
var sql = require('mssql');
var config = {
    user: '',
    password: '',
    server: '', // You can use 'localhost\\instance' to connect to named instance
    database: '',

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
};

sql.connect(config, function(err) {
    console.log(err);
});

var port = process.env.PORT || 5000;

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

var nav = [{
        Link:'/Books',
        Text: 'Book'
    },
    {
        Link:'/Authors',
        Text: 'Author'
    }];

var bookRouter = require('./src/routes/bookRoutes')(nav);
app.use('/Books', bookRouter);

var queryRouter = require('./src/routes/queryRoutes')();
app.use('/Queries', queryRouter);

app.get('/', function(req, res){
    res.render('index',
        {
           title: 'Hello from render',
           nav: nav
        });
});

app.listen(port, function(err){
    console.log('running server on port : ' + port);
});