<template>
  <div class="paginate" v-if="total_page>0">
    <br>
    <div style="float: right">Page No {{ current_page }} of {{ last_page }}</div>
    <div>
      <b-button size="sm" variant="secondary"
                Next @click="firstPage()" class="button">First
      </b-button>
      <b-button size="sm" variant="outline-info" :disabled="current_page===1"
                Previous @click="previous(number)" class="button">Prev
      </b-button>
      <span v-if="break_button===true">
    <span v-if="current_page!==1">
   <b-button size="sm" variant="outline-info"
             Next disabled class="pagination-button">....</b-button>
 </span>
    </span>
      <span v-for="n  in pages " :key="n">
   <b-button size="sm" variant="outline-info"
             Next @click="navButton(n)"
             :class="{'current button':n===number,'pagination-button button':n!==number}">{{ n }}</b-button>
 </span>
      <span v-if="break_button===true">
    <span v-if="this.status===1">
  <span v-if="total_page!==last_page">
   <b-button size="sm" variant="outline-info"
             Next disabled class="pagination-button ">....</b-button>
  </span>
 </span>
 </span>
      <b-button size="sm" variant="outline-info" :disabled="current_page===last_page"
                Next @click="next(number)" class="button">Next
      </b-button>
      <b-button size="sm" variant="secondary"
                Next @click="lastPage()" class="button">Last
      </b-button>
    </div>
    <br/>
  </div>
</template>
<script>
import {ROW_PER_PAGE} from '@/shared/common/config'

export default {
  name: "pagination",
  props: {
    paginationData: {required: true},
  },
  data() {
    return {
      current_page: 1,
      previous_page: 0,
      total_page: 0,
      start_page: 0,
      status: 1,
      number: 1,
      break_button: false,
      pages: 0,
      last_page: 0,
      offset: 0,
      perPage: ROW_PER_PAGE,
    }
  },
  mounted() {
    this.initialization();
  },
  computed: {},
  watch: {
    paginationData: function () {
      this.initialization();
    }
  },
  methods: {
    initialization() {
      this.pages = [];
      this.breakbutton = false;
      this.total_page = Math.ceil((this.paginationData / this.perPage));
      if (this.total_page === 1) {
        this.last_page = 1;
      } else {
      }
      if (this.total_page > 5) {
        this.last_page = this.total_page;
        this.total_page = 3;
        this.breakbutton = true;
        for (let i = 1; i <= this.total_page; i++) {
          this.pages.push(i);
        }
      } else {
        this.last_page = this.total_page;
        for (let i = 1; i <= this.total_page; i++) {
          this.pages.push(i);
        }
      }
      this.current_page = 1;
    },
    navButton(number) {
      this.number = number
      this.previous_page = this.current_page
      this.current_page = number;
      this.offset = (this.current_page - 1) * this.perPage;
      if (this.break_button === true) {
        if (this.previous_page > this.current_page) {
          this.status = 0
        } else if (this.previous_page < this.current_page) {
          this.status = 1
        } else if (this.previous_page === this.current_page) {
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
            this.start_page = number
            this.total_page = this.last_page
          }
          this.pages = [];
          for (let i = this.start_page; i <= this.total_page; i++) {
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
          for (let i = this.start_page; i <= this.total_page; i++) {
            this.pages.push(i);
          }

        } else if (this.previous_page === this.current_page) {
          if (number === this.last_page) {
            this.start_page = this.last_page - 2
            this.total_page = this.start_page + 2;
            this.pages = [];
            for (let i = this.start_page; i <= this.total_page; i++) {
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
      if (this.break_button === true) {
        this.start_page = this.last_page - 1
        this.total_page = this.last_page

        this.pages = [];

        for (let i = this.start_page; i <= this.total_page; i++) {
          this.pages.push(i);
        }
      }
      this.number = this.last_page
      this.$emit('pagination', this.offset)
    },
    firstPage() {
      this.current_page = 1
      this.offset = (this.current_page - 1) * this.perPage;
      if (this.break_button === true) {
        this.start_page = 1
        this.total_page = this.start_page + 2;
        this.pages = [];
        for (let i = this.start_page; i <= this.total_page; i++) {
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
      if (this.break_button === true) {
        this.start_page = number
        this.total_page = this.start_page + 2;

        if (this.total_page > this.last_page) {
          this.start_page = number
          this.total_page = this.last_page
        }
        this.pages = [];
        for (let i = this.start_page; i <= this.total_page; i++) {
          this.pages.push(i);
        }
        this.number = number + 1
      } else {
        this.number = number + 1
      }
      this.$emit('pagination', this.offset)
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
      if (this.break_button !== true) {
        this.start_page = 1
        this.total_page = this.last_page
      }
      if (this.total_page > this.last_page) {
        this.start_page = number - 2
        this.total_page = this.last_page
      }
      this.pages = [];
      for (let i = this.start_page; i <= this.total_page; i++) {
        this.pages.push(i);
      }
      this.number = number - 1
      this.$emit('pagination', this.offset)
    },
  }
}
</script>
