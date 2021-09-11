<template>
<div class="animated fadeIn entry-list" >
  <b-row>
      <b-col xs="12" lg="12">
        <b-card>
          
          <custom-modal
            v-if="isModalVisible"
            @close="closeModal"
            :title="title"
            :componentAddress="component_address"
            :id="id">
          </custom-modal>
          <div slot="header"> 
              <h5 style="padding:5px 0px;" align="left"><i class="fa fa-question-circle" aria-hidden="true"></i>&nbsp;{{title}}</h5>
          </div><br>

           <div id ="content" clas="region text-center" style="padding:10px 30px; width:65rem;">
           
               <ul>
                 <div v-for="(FAQ, index) in FAQ" v-bind:key="FAQ.id" v-if='FAQ.status=="1"'>
                   <div class="faqs-row">
                    <b-btn block href="#" v-b-toggle="'accordion'+index" style="text-align: left;font-size: 16px;background: #C6D6D6"><span>{{FAQ.header}}</span></b-btn>
                  </div>
                  <div class="faqs-answers">
                  <b-collapse v-bind:id="'accordion'+index" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <b-card-text >
                        <div style="font-size:15px;padding: 0px 30px;"><p>{{ FAQ.answer }}</p></div>
                        
                      </b-card-text>
                    </b-card-body>
                  </b-collapse>
                    </div>
                 </div>
               </ul>
           </div>
           <div slot="footer">
           <Pagination class = "paginate" v-if="(pagination.total_rows>0)" :paginationData=pagination.total_rows
                            @pagination="loadData">
            </Pagination>
           </div>
        
        </b-card>
      </b-col>
  </b-row>
</div>

</template>

<style scoped>
    div {
        padding-bottom: 10px;
    }
    #main-content-header
    {
      padding-top:10px; padding-bottom: 20px; padding-left: 85px
    }
    button {
        background-color: #C6D6D6;
        border: none;
        font-size: 16px;
        text-align: left;
    }

    div.faqs-row{
        text-align: left;
        padding-left: 0px;

    }
    div.faqs-answers {
        background-color: white;
        display: block;
        overflow: hidden;
    }
</style>
<script src="@/components/services/admin/help/faq.js"></script>
