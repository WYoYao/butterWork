/**
 * 创建Controller 的请求类可以添加
 */
class Controller {
    constructor(arr) {

        return this.push.call(this, arr);
    }
    push(arr) {
        if (!_.isArray(arr)) throw new TypeError('Arugments must be an Array');

        for (const { name, url, argu, cb } of arr) {
            if (_.has(this, name)) throw new TypeError(`${name}与现有的属性重复请合并后再使用`);


            this[name] = (argus = {}) => {

                if (_.isFunction(cb)) {
                    // 调用假数据方法进行查询
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            cb(argus);
                        }, _.random(1000, 2000));
                    });
                } else {
                    // 真实发请求
                    return new Promise((resolve, rejcet) => {
                        pajax.post({
                            url: url,
                            data: Object.assign({}, argu, argus),
                            success: resolve,
                            error: rejcet,
                        });
                    })
                }
            }
        }
        return this;
    }
}
