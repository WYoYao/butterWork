// Load the full build.
var _ = require('lodash');


function _deep(attr) {
    // if(_)
}

// 模块执行的操作
function moduleFn() {

}

// 部分执行的操作
function partFn() {

}

// 页面执行操作
function pageFn(isFinaly) {

}

function deep(arr, parent) {

    var _deep = arguments.callee;
    arr.forEach(function(item) {
        // 浅赋值上级的父级链接
        var par = parent.map(function(item) {
            return item;
        });

        // item.code = (Math.random() * Math.pow(10, 6)).toString().slice(0, 6);

        // 将自己添加到链接集合中
        par.push(item.code);

        // 添加父级链接
        item.parents = par;
        // 绑定页面展示需要数据
        item.isOn = false;
        item.isSelected = false;

        // 如果有子集循环自己
        if (_.isArray(item.content) && item.content.length) _deep(item.content, par);
    })
};



var map = {
    basicMng: {
        personManage: {
            list: '',
            settine: '',
        },
        systemManage: {
            list1: '',
            settine1: '',
        },
        scheduleManage: {
            list2: '',
            settine2: '',
        }
    },
    basicMnga: {
        personManagea: {
            lista: '',
            settinea: '',
        },
        systemManagea: {
            list1a: '',
            settine1a: '',
        },
        scheduleManagea: {
            list2a: '',
            settine2a: '',
        }
    }
}

/**
 * 生成递归循环函数
 * @param {any} fn 
 */
function createDeep(covertfn, boolfn) {

    return function(obj, cont) {

        var _deep = arguments.callee;

        return covertfn(obj, cont).forEach(function() {

            var res = boolfn(arguments) || {};

            res.isBool || false ? _deep(res.obj, res.cont) : void 0;

            return con;
        });
    };
}


var test = createDeep(function(obj, cont) {

    cont = cont || [];

    return Object.keys(obj).map(function(key) {

        // 保存链接
        var parents = cont.map(function(item) {
            return item;
        });

        parents.push(key);

        return {
            key: key,
            value: obj[key],
            parents: parents
        }
    })

}, function(item, index, content) {

    var parents = item.parents.map(function(info) {
        return info;
    })

    parents.push(key);

    console.log(parents.join(''));

    var isBool = _.isPlainObject(item.value);
    var cont = parents;

    return {
        isBool,
        obj: item.value,
        cont,
    }
})



test(map);