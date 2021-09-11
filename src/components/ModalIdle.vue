<template>
 <div>{{remaining}}</div>
</template>

<script>
    import {mixin as VueTimers} from 'vue-timers'
    import moment from 'moment';
    export default {
        name: 'countdown',

        timers: {
            updateTime: { time: 1000, autostart: false, repeat: true}
        },

        mixins: [VueTimers],
        data() {
            return {
                remaining_secs: null,
                ends_at: null,
            }
        },
        mounted(){

            this.start();
        },
        /*created() {
            console.log("this.timeArray",this.timeArray);
            let timerId = setInterval(() => {
                //this.time -= 1;
                console.log("this.timeArray",this.timeArray);
                //if (!this.$store.state.idleVue.isIdle) clearInterval(timerId);
                this.min = this.timeArray[0];
                this.second = this.checkSecond((this.timeArray[1] - 1));
                console.log("this.second",this.second );
                console.log("this.min",this.min);
                if(this.second == 59){
                    this.second = this.second-1}
                if (this.min < 0){
                    clearInterval(timerId);
                    this.$store.dispatch('auth/logout')
                        .then(() => {
                            this.$router.push('/login')
                        });
                    this.$store.dispatch('search/resetState');
                }
                if(this.min < 10) {
                    this.min = ('0'+this.min).slice(-2);
                }
            });
        },*/
        methods: {
            start: function () {
                this.ends_at = moment().add(30, 'minutes');
                this.$timer.start('updateTime');
            },
            updateTime: function(){
                if(!this.isIdle){
                    this.start();
                }
                const now = moment();
                const ends = moment(this.ends_at);
                const duration = moment.duration(ends.diff(now));

                this.remaining_secs = Math.floor(duration.asSeconds());
                if(this.remaining_secs == '0'){
                    this.$store.dispatch('auth/logout')
                        .then(() => {
                            this.$router.push('/login')
                        });
                    this.$store.dispatch('search/resetState');
                }
            }
        },
        computed:{
            
            remaining: function () {

                if (!this.remaining_secs) {
                    return '30:00';
                }
                const duration = moment.duration(this.remaining_secs, 'seconds');

                const mins = duration.minutes();
                const secs = duration.seconds();
                let time_sec = secs;
                let time_min = mins;
               // return mins ? `${mins}:${secs}` : `0:${secs}`;
                if(mins && mins<10){
                    time_min = `0${mins}`;
                }
                if(secs && secs<10 || secs==0){
                    time_sec = `0${secs}`;
                }
                return mins ? `${time_min}:${time_sec}` : `00:${time_sec}`;
            },
            isIdle:function() {
                return this.$store.state.idleVue.isIdle;
            },
        }
    };
</script>