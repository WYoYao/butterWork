

function makeColor(){

    return `rgba(${_.range(3).map(item=>_.random(0, 255)).join(',')},0.${_.random(1, 9)})`;
}

function mock(){
    
    return _.range(100).map(makeColor);
}

/**
 * 
 * @param {每部分的外部距离} Margin 
 * @param {单个实例的体积} Height 
 * @param {每部分最大体积} Max 
 * @param {第一个部分特殊的高度} Special 
 */
function createSkip(Margin,Height,Max,Special){

    return function(arr){

        // 每组数量 
        let size = Math.floor((Max-Margin)/Height);

        // 第一组特别的个数
        let SpecialNum=Special?_.floor((Max-Margin-Special)/Height):size;

        // 重新分组
        let groups = [_.slice(arr, 0, SpecialNum)].concat(_.chunk(_.slice(arr, SpecialNum), size));

        // 返回分组
        return groups;
    }
};

const Margin=40,Height=20,Max=600;

let app=new Vue({
    el: '#app',
    data:{
        colors:mock(),
    },
    methods:{
        //  根据高度分组
        skip:createSkip(Margin,Height,Max,100),
        // skip:function(arr){

        //     // 每组数量
        //     let size = Math.floor((Max-Margin)/20);

        //     // 重新分组
        //     let groups = _.chunk(arr, size);

        //     // 返回分组
        //     return groups;
        // }
    }
})