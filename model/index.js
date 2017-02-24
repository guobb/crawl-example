/**
 * Created by apple on 17/2/24.
 */
const mysql = require('mysql');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user:'root',
    password:'123456',
    database:'nodeJs'
});

exports.category = function (callback) {

    pool.query('select * from category', callback);
};

exports.article = function (callback) {

    pool.query('select * from article', callback);
};