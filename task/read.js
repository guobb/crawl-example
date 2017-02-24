/**
 * Created by apple on 17/2/24.
 */

const url = "http://top.baidu.com/category?c=10&fr=topbuzz_b7_c10";

const request = require('request');  //  拉取网页内容
const cheerio = require('cheerio');  //  实现jquery功能
const iconv = require('iconv-lite'); //  把gbk转化utf8
/**
 * res 响应对象
 * body 响应体
 */

exports.category = function (url, callback) {
    request({url: url, encoding: null}, (err, res, body) => {
        if (err) {
            return console.error(err);
        }

        // 把 gbk 编码的 buffer 转成utf-8 编码的字符串
        body = iconv.decode(body, 'gbk');

        // 根据响应体转成dom对象
        let $ = cheerio.load(body);
        let items = [];
        // 找到所有的分类的a标签 并进行转换
        $('.hd .title a').each(function () {
            let $me = $(this);

            let item = {
                name: $me.text().trim(),
                url: $me.attr('href'),
            };
                let result = regParams(item.url);

                item.id = result.b;
                items.push(item);

        });

        callback(null, items);
    });
};


function regParams(url) {
    let obj = {};
    let reg = /([^?&=]*)=([^?&=]*)/g;
    url.replace(reg, function (src, $1, $2) {
        obj[$1] = $2;
    });

    return obj;

}


let articleUrl = 'http://top.baidu.com/buzz?b=353&c=10&fr=topcategory_c10';


exports.article = function (url,cid, callback) {
    request({url: articleUrl, encoding: null}, (err, res, body) => {
        if (err) {
            return console.error(err);
        }

        // 把 gbk 编码的 buffer 转成utf-8 编码的字符串
        body = iconv.decode(body, 'gbk');

        // 根据响应体转成dom对象
        let $ = cheerio.load(body);
        let items = [];
        // 找到所有的分类的a标签 并进行转换
        $('.keyword a').each(function () {
            let $me = $(this);

            let item = {
                name: $me.text().trim(),
                url: $me.attr('href'),
                cid:cid
            };
            //console.log(item)
            if(item.name != 'search') {
                items.push(item);
            }

        });
        callback(null,items);
    });
};
