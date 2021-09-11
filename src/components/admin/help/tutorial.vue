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
              <h5 style="padding:5px 0px;" align="left"><i class="fa fa-video-camera" aria-hidden="true"></i>&nbsp;{{ $t("video_tutorial") }}</h5>
          </div>
          <div class="table-responsive"  style="padding:10px 15px;">

              <table class="table table-bordered">
                  <tbody  v-for="(tutorial, index) in tutorial" v-bind:key="tutorial.id"
                          v-if='tutorial.status=="1"'>
                    <tr>
                        <td v-if="tutorial.link">
                            <a href="#" v-on:click="customModal(tutorial.link)">
                            <img :src="thumbnailUrl(tutorial.link)"  width="120" height="120">
                            </a>
                        </td>
                        <td style="font-size: 13px;">
                          <strong>{{tutorial.header}}</strong><br>
                          <p>{{tutorial.description}}</p> 
                        </td>

                    </tr>
                  </tbody>
              </table>
          </div>
          <div slot="footer">
            <Pagination class = "paginate" v-if="pagination.total_rows>0" :paginationData=pagination.total_rows
                      @pagination="loadData"></Pagination>
          </div>
                  
          </b-card>
        </b-col>
    </b-row>
</div>
</template>



<script src="@/components/services/admin/help/tutorial"></script>
<style scoped>
  /* div.animated fadeIn entry-list{
    padding-left: 50px; padding-top: 25px
  } */
  .table-bordered > tbody > tr > td, .table-bordered > thead > tr > td {
    border: 1px solid grey;
  }
  </style>