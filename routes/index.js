var express = require('express');
const async = require('async');
var router = express.Router();
const model = require('../model');

router.get('/', function (req, res, next) {

    //  1.读取文章的列表和分类的列表

    async.parallel([
        function (cb) {
            model.category(cb);
        },
        function (cb) {
            model.article(cb);
        }
    ], function (err, result) {
        console.log(result);

    });
    res.render('index', {
        categories: result[0],
        articles: result[1]
    });
});

module.exports = router;
