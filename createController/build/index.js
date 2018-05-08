var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 创建Controller 的请求类可以添加
 */
var Controller = function () {
    function Controller(arr) {
        _classCallCheck(this, Controller);

        return this.push.call(this, arr);
    }

    _createClass(Controller, [{
        key: 'push',
        value: function push(arr) {
            var _this = this;

            if (!_.isArray(arr)) throw new TypeError('Arugments must be an Array');

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                var _loop = function _loop() {
                    var _step$value = _step.value,
                        name = _step$value.name,
                        url = _step$value.url,
                        argu = _step$value.argu,
                        cb = _step$value.cb;

                    if (_.has(_this, name)) throw new TypeError(name + '\u4E0E\u73B0\u6709\u7684\u5C5E\u6027\u91CD\u590D\u8BF7\u5408\u5E76\u540E\u518D\u4F7F\u7528');

                    _this[name] = function () {
                        var argus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


                        if (_.isFunction(cb)) {
                            // 调用假数据方法进行查询
                            return new Promise(function (resolve, reject) {
                                setTimeout(function () {
                                    cb(argus);
                                }, _.random(1000, 2000));
                            });
                        } else {
                            // 真实发请求
                            return new Promise(function (resolve, rejcet) {
                                pajax.post({
                                    url: url,
                                    data: Object.assign({}, argu, argus),
                                    success: resolve,
                                    error: rejcet
                                });
                            });
                        }
                    };
                };

                for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    _loop();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return this;
        }
    }]);

    return Controller;
}();