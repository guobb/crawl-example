/**
 * Created by apple on 17/2/24.
 */
const mysql = require('mysql');
const async = require('async');

const pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'123456',
    database: 'nodeJs'
});

let connection = mysql.createConnection();


// 把分类列表存入数据库
exports.category = function (list, callback) {
    async.forEach(list, function (item,cb) {
        pool.query('insert info category(id,name,url) values(?,?,?)',[item.id,item.name,item.url],cb);
    },callback);
};

// 把文章列表存入数据库
exports.article = function (list, callback) {
    async.forEach(list, function (item,cb) {
        pool.query('insert info article(name,url,cid) values(?,?,?)',[item.name,item.url,item.cid],cb);
    },callback);
};