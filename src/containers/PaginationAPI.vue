<template>

    <div v-if="total_page>1">

        <div class="btn-group float-right">
            <div style=" margin-right: 14px;margin-top: 4px;">{{current_page}} of {{last_page}}</div>
            <b-button size="sm" variant="outline-info" :disabled="current_page===1"
                      Previous @click="previous(number)" class="btn btn-sm"><i class="fa fa-chevron-left"></i>
            </b-button>

            <b-button size="sm" variant="outline-info" :disabled="current_page===last_page"
                      Next @click="next(number)" class="btn btn-sm"><i class="fa fa-chevron-right"></i>
            </b-button>
        </div>
        <br/>
    </div>
</template>
<script>
    import {shuffleArray} from '@/shared/utils'
    import {Message_ROW_PER_PAGE} from '@/shared/common/config'

    export default {
        name: "pagination",
        props: {
            paginationData: {required: true},

        },
        data() {
            return {
                gettotalrow: 0,
                current_page: 1,
                previous_page: 0,
                total_page: 0,
                start_page: 0,
                status: 1,
                number: 1,
                breakbutton: false,
                pages: 0,
                last_page: 0,
                offset: 0,
                perPage: Message_ROW_PER_PAGE,


            }
        },
        mounted() {
            this.initialization();

        },
        computed: {},
        watch: {
// whenever question changes, this function will run
            paginationData: function () {
                this.initialization();
            }
        },

        methods: {

            initialization() {
                this.pages = [];
                this.breakbutton = false;
                this.total_page = Math.ceil((this.paginationData / this.perPage));
                if (this.total_page == 1) {
                    this.last_page = 1;
                } else {

                }

                if (this.total_page > 5) {
                    this.last_page = this.total_page;
                    this.total_page = 3;
                    this.breakbutton = true;
                    for (var i = 1; i <= this.total_page; i++) {
                        this.pages.push(i);
                    }

                } else {
                    this.last_page = this.total_page;
                    for (var i = 1; i <= this.total_page; i++) {
                        this.pages.push(i);
                    }
                }

                this.current_page = 1;
            }
            ,
            navbutton(number) {
                this.number = number
                this.previous_page = this.current_page
                this.current_page = number;
                this.offset = (this.current_page - 1) * this.perPage;
                // alert(this.total_page)

                if (this.breakbutton == true) {
                    if (this.previous_page > this.current_page) {
                        this.status = 0
                    } else if (this.previous_page < this.current_page) {
                        this.status = 1
                    } else if (this.previous_page == this.current_page) {
                        if (this.status) {
                            this.status = 0;
                        } else {
                            this.status = 1;
                        }
                    }

                    if (this.previous_page < this.current_page) {

                        this.start_page = number
                        this.total_page = this.start_page + 2;

                        if (this.total_page > this.last_page) {
                            // alert(this.last_page)
                            this.start_page = number
                            this.total_page = this.last_page
                        }
                        this.pages = [];

                        for (var i = this.start_page; i <= this.total_page; i++) {
                            this.pages.push(i);
                        }

                    } else if (this.previous_page > this.current_page) {
                        this.start_page = number - 1
                        if (this.start_page > 0) {
                            this.total_page = this.start_page + 2;
                        } else {
                            this.start_page = 1
                            this.total_page = this.start_page + 2;
                        }


                        this.pages = [];

                        for (var i = this.start_page; i <= this.total_page; i++) {
                            this.pages.push(i);
                        }

                    } else if (this.previous_page == this.current_page) {
                        if (number == this.last_page) {

                            this.start_page = this.last_page - 2
                            this.total_page = this.start_page + 2;

                            this.pages = [];

                            for (var i = this.start_page; i <= this.total_page; i++) {
                                this.pages.push(i);
                            }
                        }
                    }


                }

                this.$emit('pagination', this.offset)
            },

            lastPage() {
                this.current_page = this.last_page
                this.offset = (this.current_page - 1) * this.perPage;
                if (this.breakbutton == true) {
                    this.start_page = this.last_page - 1
                    this.total_page = this.last_page

                    this.pages = [];

                    for (var i = this.start_page; i <= this.total_page; i++) {
                        this.pages.push(i);
                    }
                }
                this.number = this.last_page
                this.$emit('pagination', this.offset)
            },

            firstPage() {
                this.current_page = 1
                this.offset = (this.current_page - 1) * this.perPage;
                if (this.breakbutton == true) {
                    this.start_page = 1
                    this.total_page = this.start_page + 2;


                    this.pages = [];

                    for (var i = this.start_page; i <= this.total_page; i++) {
                        this.pages.push(i);
                    }
                }
                this.number = 1;
                this.$emit('pagination', this.offset)
            },

            next(number) {

                this.previous_page = this.current_page
                this.current_page = this.current_page + 1;
                this.offset = (this.current_page - 1) * this.perPage;

                this.status = 1;


                if (this.breakbutton == true) {
                    this.start_page = number
                    this.total_page = this.start_page + 2;

                    if (this.total_page > this.last_page) {
                        this.start_page = number
                        this.total_page = this.last_page
                    }
                    this.pages = [];

                    for (var i = this.start_page; i <= this.total_page; i++) {
                        this.pages.push(i);
                    }

                    this.number = number + 1
                }else{
                    this.number = number + 1
                }
                //this.$emit('pagination', this.offset)
                this.$emit('pagination', this.current_page)

            },

            previous(number) {
                this.previous_page = this.current_page
                this.current_page = this.current_page - 1;
                this.offset = (this.current_page - 1) * this.perPage;


                this.status = 0;
                this.start_page = number - 1
                if (this.start_page > 0) {
                    this.total_page = this.start_page + 2;
                } else {
                    this.start_page = 1
                    this.total_page = this.start_page + 2;
                }


                if (this.breakbutton != true) {

                    this.start_page = 1
                    this.total_page = this.last_page

                }

                if (this.total_page > this.last_page) {

                    this.start_page = number - 2
                    this.total_page = this.last_page
                }

                this.pages = [];
                for (var i = this.start_page; i <= this.total_page; i++) {
                    this.pages.push(i);
                }


                this.number = number - 1

                this.$emit('pagination', this.offset)

            },

        }
    }
</script>
