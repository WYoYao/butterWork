


const app = new Vue({
    el: '#app',
    data: {
        max: "",
        input: false,
        now: "",
    },
    methods: {
        smt() {
            this.input = (_.isNaN(+(this.max))) ? false : true;
        },
        cel() {
            this.input = false;
        }
    },
    computed: {
        value() {
            try {
                let { now, max } = this;
                now = +now;
                max = +max;
                return (_.isNumber(max) && _.isNumber(now)) ? (+(now / max).toFixed(2) * 100).toFixed() : 0;
            } catch (error) {
                return 0;
            }
        }
    }
})