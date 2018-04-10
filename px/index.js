


const app = new Vue({
    el: '#app',
    data: {
        max: "",
        input: false,
        now: "",
        arr: [],
    },
    methods: {
        smt() {

            if (_.isNaN(+(this.max))) return;

            this.arr.push({
                max: this.max,
                now: 0,
                value: 0,
            })
        },
        cel(index) {
            this.arr.splice(index, 1);
        }
    },
    computed: {
        values() {

            return this.arr.map((item) => {

                let { now, max } = item;
                now = +now;
                max = +max;
                let value = (_.isNumber(max) && _.isNumber(now)) ? (+(now / max).toFixed(2) * 100).toFixed() : 0;

                item.value = value;
                return item;
            })
        }
    }
})