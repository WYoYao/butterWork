const fs = require('fs');
const path = require('path');

// Load the full build.
const _ = require('lodash');


// 创建创建对应的文件结构
function createStructure(map, p = __dirname) {




}


function _deep(attr) {
    // if(_)
}


function isExists(url) {

    return new Promise((resolve, reject) => {
        // 保存链接
        let uri = path.join(__dirname, url);
        // 验证是否存在不存在创建对应的目录
        fs.access(uri, err => !err ? resolve() : fs.mkdir(uri, () => resolve()));

    });
}

let isPliuck = isExists('./publick');
let isView=isExists('./View');

// 递归通过方法
function recursive(argu){
    

}

    // return function(obj){

        
    // }


