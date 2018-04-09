var fs = require('fs');
var path = require('path');

// Load the full build.
var _ = require('lodash');



var isPliuck = isExists('./publick');
var isView = isExists('./View');


function isExists(url) {

    return new Promise((resolve, reject) => {
        // 保存链接
        var uri = path.join(__dirname, url);
        // 验证是否存在不存在创建对应的目录
        fs.access(uri, err => !err ? resolve() : fs.mkdir(uri, () => resolve()));

    });
}