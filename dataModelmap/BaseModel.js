/*数据model映射配置，支持无限嵌套
 *getEnergyItem 	此节点(以下统称请求地址)名称为pajax的get或post方法的参数的url值，后台将根据此节点内配置来返回需要的数据
 *note	对请求地址或name节点的解释；非必须，默认值为name的值或请求地址
 *type	数据类型，必须，现阶段包括 boolean、number、string、date、object、array、tree、fileLink
 *	对于fileLink 后台自动返回可供下载的连接地址
 *	对于tree，需要数据端返回平铺数据，网站后台将根据proArr内的配置返回给客户端拼好的树型菜单，
 *		即使没有配置项返回数据也包含id、parentId(父级id)、child(子级)、level(节点级别)；
 *		根节点的parentId为null
 *	对于array类型，当不配置proArr时，将直接把后台的返回赋给该属性
 *	对于请求地址节点的第一级type，只有array、object、tree，即返回给客户端的要么是object，要么是array，要么是tree
 *name	客户端model内的属性名称，必须
 *mapName	name节点的值对应的数据端的属性名称，非必须，默认值为name节点的值
 *format 格式化日期类型的字符串，y 年  M月  d日  h时  m分   s秒；其它类型暂不生效，非必须，无默认值
 *fixed	小数位数，对于非数字，此节点可不配置。非必须，默认保留1位
 *fixedByInt	是否根据整数位自动保留小数位数，非必须，默认false，对于非数字，此节点可不配置；为true时的规则为，整数位大于零时保留1位否则保留3位
 *isToSpecial	值不存在时是否转为特殊值，默认true，现阶段特殊值为--
 *proArr		属性集，对于数据类型为object、array、tree的节点，proArr才会生效。
 *proArrBy	属性依赖，其值为当前配置文件内的某节点名称，该节点的值等同与proArr的属性值；可以多个属性的proArrBy指向同一节点，以实现节点共用
 *mapParentId	parentId对应的数据端的属性名称，必须
 *mapParentIdTo	parentId在数据端对应的父级的属性名称，必须
 *-----------------------------------------------------------嵌套层级多的时候，检查各层级name值的长度总和，不能超过64
 */
var dataModelMap = {
    energyItemPro: [{
        name: 'id',
        mapName: 'energyId',
        type: 'string'
    }, {
        name: 'name',
        mapName: 'energyName',
        type: 'string'
    }],
    'getEnergyItem': {
        note: '获取分项',
        type: 'object',
        format: 'y.M.d',
        fixed: 0,
        fixedByInt: false,
        isToSpecial: true,
        proArr: [{
            name: 'builds',
            note: '建筑列表',
            mapName: 'buildArr',
            type: 'array',
            proArr: [{
                name: 'id',
                note: '标识',
                mapName: 'buildId',
                type: 'string'
            }, {
                name: 'name',
                note: '建筑名称',
                mapName: 'buildName',
                type: 'string'
            }, {
                name: 'createTime',
                note: '竣工时间',
                mapName: 'time',
                type: 'string',
                format: 'y.M.d'
            }]
        }, {
            name: 'energyItems',
            note: '分项树',
            mapName: 'energyItems',
            type: 'tree',
            mapParentId: 'parentId',
            mapParentIdTo: 'energyId',
            proArrBy: 'energyItemPro' //该配置等同于proArr:[{name: 'id', mapName:'energyId',type: 'string'},{name: 'name', mapName:'energyName',type: 'string'}]
        }]
    }
};


/**
 * 常用基础实体类
 * 
 * @param {any} name 
 * @param {any} type 
 * @param {any} note 
 */
function BaseModel(source, name, note) {

    // 基本属性赋值

    // 最外层可能的内有name属性
    if (name) this.name = name;
    this.type = getType(source).toLowerCase();
    this.note = note || name || '未输入note';

    // 根据类型判断
    if (isBaseObject(source)) {

        this.proArr = [];

        var _that = this;

        source = this.type == 'array' ? source[0] : source;

        if (source == null) return;
        Object.keys(source).reduce(function(cont, key) {

            // 过滤原型属性
            if (!source.hasOwnProperty(key)) return cont;

            var value = source[key];

            // 过滤 null 值
            value = value == null ? '当前值为null无法判断' : value;


            try {

                cont.push(new BaseModel(value, key));
            } catch (error) {

                console.log(error, value, key);
            }

            return cont;

        }, _that)

    }
}

// 向类型中的proArr数组中添加的数据
BaseModel.prototype.push = function(obj) {
    // 非空验证
    if (getType(this.proArr) != 'Array') throw new Error('当前数据类型不支持proArr');

    return this.proArr.push(obj);
}

// 获取类型
function getType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
}

function isBaseObject(str) {
    var type = getType(str);
    return (type == 'Object' || type == 'Array');
}



module.exports = BaseModel;