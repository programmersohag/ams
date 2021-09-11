<template>

<div class="paginate">
<br>
<div style="float:right">Page No {{currentpage}} of {{lastpage}}</div>



    <b-button size="sm" variant="secondary"
              Next @click="firstpages()" class="mr-1" >First</b-button>

<b-button size="sm" variant="outline-info"   :disabled="currentpage===1"
                  Previous @click="prev(num)"  class="mr-1">Prev</b-button>
    <span v-if="breakbutton==true" >
    <span v-if="currentpage!=1" >


   <b-button size="sm" variant="outline-info"
             Next  disabled class="pagination-button" >....</b-button>
 </span>
    </span>

    <span v-for="n  in pages " :key="n">
  
   <b-button size="sm" variant="outline-info"
                  Next @click="navbutton(n)"  class="pagination-button" >{{n}}</b-button>
 </span>
    <span v-if="breakbutton==true" >
    <span v-if="this.status==1" >
  <span v-if="pagecount!=lastpage" >
   <b-button size="sm" variant="outline-info"
             Next  disabled  class="pagination-button" >....</b-button>
  </span>
 </span>
 </span>
<b-button size="sm" variant="outline-info" :disabled="currentpage===lastpage"
                  Next @click="next(num)" class="mr-1" >Next</b-button>

<b-button size="sm" variant="secondary"
                  Next @click="Lastpages()" class="mr-1" >Last</b-button>

 </div>
</template>
<script>
import { shuffleArray } from '@/shared/utils'
import router from '@/router/index.js'
import  axios  from  'axios'
export default {
 name: "pagination",
 props: {
        PaginationData:{required :true},
        perPage:{required :true},
     // offset:{type :Number,required :true},

      },
 data(){
    return {  
    gettotalrow:0,
     valuenumber:1,
     currentpage:1,
     prevpage:0,
     pagecount:0,
        lastviewpage:0,
        startpage:0,
        pagesvalue:[],
        status:1,
        num:1,
        breakbutton:false,
        newpage:0,
        pagevaule:0,
        testv:0,
        pages:0,
        lastpage:0,
        offset:0


    }
  },
mounted(){
this.fixdata();

  },
computed: {
  },
    watch: {
// whenever question changes, this function will run
PaginationData: function () {
      this.fixdata();
        }
    },

methods: {

     fixdata(){
         this.pages=[];
         this.breakbutton=false;
         this.pagecount= Math.ceil((this.PaginationData/this.perPage));
         if(this.pagecount==1){
             this.lastpage=1;
         }else{

         }

         if(this.pagecount>5){
             this.lastpage=this.pagecount;
             this.pagecount=3;
             this.breakbutton=true;
             for(var i=1;i<=this.pagecount;i++)
             {
                 this.pages.push(i);
             }

         }else{
             this.lastpage=this.pagecount;
             for(var i=1;i<=this.pagecount;i++)
             {
                 this.pages.push(i);
             }
         }

         this.currentpage=1;
     }
     ,
navbutton(number)
{
    this.num= number
      this.prevpage=this.currentpage
        this.currentpage=number;
      this.offset= (this.currentpage-1)*this.perPage;
      // alert(this.pagecount)

    if(this.breakbutton==true) {
        if (this.prevpage > this.currentpage) {
            this.status = 0
        } else if (this.prevpage < this.currentpage) {
            this.status = 1
        } else if (this.prevpage == this.currentpage) {
            if (this.status) {
                this.status = 0;
            } else {
                this.status = 1;
            }
        }

        if (this.prevpage < this.currentpage) {

            this.startpage = number
            this.pagecount = this.startpage + 2;

            if (this.pagecount > this.lastpage) {
                // alert(this.lastpage)
                this.startpage = number
                this.pagecount = this.lastpage
            }
            this.pages = [];

            for (var i = this.startpage; i <= this.pagecount; i++) {
                this.pages.push(i);
            }

        }else if (this.prevpage >this.currentpage) {
            this.startpage = number - 1
            if (this.startpage > 0) {
                this.pagecount = this.startpage + 2;
            } else {
                this.startpage = 1
                this.pagecount = this.startpage + 2;
            }


            this.pages = [];

            for (var i = this.startpage; i <= this.pagecount; i++) {
                this.pages.push(i);
            }

            // this.pagecount = this.startpage-2;
        }else if(this.prevpage==this.currentpage ){
            if(number==this.lastpage)
            {

                this.startpage = this.lastpage-2
                this.pagecount = this.startpage + 2;

                this.pages = [];

                for (var i = this.startpage; i <= this.pagecount; i++) {
                    this.pages.push(i);
                }
            }
        }


    }

       this.$emit('pagination',this.offset)
},

Lastpages()
{
this.currentpage=this.lastpage
this.offset= (this.currentpage-1)*this.perPage;
    if(this.breakbutton==true) {
        this.startpage = this.lastpage - 1
        this.pagecount = this.lastpage

        this.pages = [];

        for (var i = this.startpage; i <= this.pagecount; i++) {
            this.pages.push(i);
        }
    }
    this.num=this.lastpage
this.$emit('pagination',this.offset)
},

firstpages()
    {
        this.currentpage=1
        this.offset= (this.currentpage-1)*this.perPage;
        if(this.breakbutton==true) {
            this.startpage = 1
            this.pagecount = this.startpage + 2;


            this.pages = [];

            for (var i = this.startpage; i <= this.pagecount; i++) {
                this.pages.push(i);
            }
        }
        this.num=1;
        this.$emit('pagination',this.offset)
    },

next(number)
{

this.prevpage=this.currentpage
this.currentpage=this.currentpage+1;
this.offset= (this.currentpage-1)*this.perPage;

            this.status=1;



    if(this.breakbutton==true) {
        this.startpage = number
        this.pagecount = this.startpage + 2;

        if (this.pagecount > this.lastpage) {
            // alert(this.lastpage)
            this.startpage = number
            this.pagecount = this.lastpage
        }
        this.pages = [];

        for (var i = this.startpage; i <= this.pagecount; i++) {
            this.pages.push(i);
        }

        this.num = number + 1
    }
this.$emit('pagination',this.offset)

},

prev(number)
{
    // this.num=number
this.prevpage=this.currentpage
 this.currentpage=this.currentpage-1;
 this.offset= (this.currentpage-1)*this.perPage;


    this.status=0;
        this.startpage = number-1
        if(this.startpage > 0){
            this.pagecount = this.startpage+2;
        }else{
            this.startpage=1
            this.pagecount = this.startpage+2;
        }


        if(this.breakbutton!=true) {

                this.startpage = 1
                this.pagecount = this.lastpage

        }

    if (this.pagecount > this.lastpage) {
        // alert(this.lastpage)
        this.startpage = number - 2
        this.pagecount = this.lastpage
    }

        this.pages=[];
        for(var i=this.startpage;i<=this.pagecount;i++)
        {
            this.pages.push(i);
        }

        // this.pagecount = this.startpage-2;
    this.num=number-1

this.$emit('pagination',this.offset)

   

},

}
}
</script>
