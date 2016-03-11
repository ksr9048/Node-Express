var express = require('express');
var bookRouter = express.Router();
var sql = require('mssql');

var router = function(nav) {
    /*var books = [
        {
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Leo Tolstoy',
            read: false
        },
        {
            title: 'Childhood',
            genre: 'Biography',
            author: 'Leo Tolstoy',
            read: false
        },
        {
            title: 'Life on the Mississippi',
            genre: 'History',
            author: 'Mark Twain',
            read: false
        },
        {
            title: 'Les Miserables',
            genre: 'Historical Fiction',
            author: 'Victor Hugo',
            read: false
        }
    ];*/

    bookRouter.route('/')
        .get(function(req, res){
            var request = new sql.Request();
            console.log('exec proc');
            request.query('select * from [dbo].[POC.Books]',
                function(err, data) {
                    res.render('booksListView',
                        {   title: 'Books',
                            nav: nav,
                            books: data
                        });
                });
        });

    bookRouter.route('/jsonbooks')
        .get(function(req, res){
            var request = new sql.Request();
            request.query('select * from [dbo].[POC.Books]',
                function(err, data) {
                    res.json(
                        {   title: 'Books',
                            nav: nav,
                            books: data
                        });
                });
        });

    bookRouter.route('/:id')
        .all(function(req, res, next) {
            var id = req.params.id;
            var ps = new sql.PreparedStatement();
            ps.input('id', sql.Int);
            ps.prepare('select * from [dbo].[POC.Books] where id = @id',
                function(err) {
                    ps.execute({id:req.params.id},
                        function(err, data) {
                            if(data.length === 0) {
                                res.status(404).send('Not found');
                            } else {
                                req.book = data[0];
                                next();
                            }
                        }
                    );
                }
            );
        })
        .get(function(req, res){
            res.render('bookView', {
                title: 'Books',
                nav: nav,
                book: req.book
            });
        });

    return bookRouter;
};

module.exports = router;