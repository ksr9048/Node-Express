/**
 * Created by krao on 3/11/2016.
 */

var express = require('express');
var queryRouter = express.Router();
var sql = require('mssql');

var router = function() {
    queryRouter.route('/')
        .all(function(req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);

            // Pass to next layer of middleware
            next();
        })
        .get(function(req, res) {
           var request = new sql.Request();
            request.execute('[utils].[GetLastDaysSlowPerformingSQL]', function(err, data) {
               if(err) {
                   console.log(err)
               } else {
                   res.json({listQueries: data, listQueryStatistics: []});
               }
            });
        });

    return queryRouter;
};

module.exports = router;
