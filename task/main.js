/**
 * Created by apple on 17/2/24.
 */

const async = require('async');
const read = require('./read');
const save = require('./save');

const url = "http://top.baidu.com/category?c=10&fr=topbuzz_b7_c10";


let categories = [];
let articles = [];
// 串行执行
async.series([
    // 得到分类列表
    function (done) {
        read.category(url, function (err, list) {
            categories = list;
            done();
        });
    },
    // 把分类的列表保存到数据库中
    function (done) {
        save.category(categories,done);
    },

    function (done) {
        async.forEach(categories,function (category,next) {
            read.article('http://top.baidu.com/buzz?b='+ category.id +'&c=10&fr=topcategory_c10',function (err,list) {
                // 把每个分类下面的文章列表全部加在一起；
                articles = articles.concat(list);
                next();
            })
        },done)
    },

    function (oone) {
        save.article(articles,done);
    }

],function (err,result) {
    console.log('所有的任务完成啦')
});

read.category(url, function (err, categorys) {
   // console.log(categorys);
});

let articleUrl = 'http://top.baidu.com/buzz?b=353&c=10&fr=topcategory_c10';

read.article(articleUrl, function (err, articles) {

    console.log(articles)
});