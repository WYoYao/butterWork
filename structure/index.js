var fs = require('fs');
var path = require('path');

// Load the full build.
var _ = require('lodash');

var recursive = require('./recursive.js');
var fileEvent = require('./fileEvent.js')


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
    }
}


// 创建创建对应的文件结构
function createStructure(map, p) {

}