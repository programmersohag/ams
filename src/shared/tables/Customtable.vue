<template>
  <b-container fluid>
       <b-card>
         <div  v-if="massage">
           
          <b-alert variant="success"  v-if="alertclass=='success'" show>{{massage}}</b-alert>
<b-alert variant="warning"  v-if="alertclass=='warning'" show>
    <p>
{{massage}}
</p>
</b-alert>
         </div>
         <!-- {{massage}} -->
<div v-if=indexUrl.Issearch>
        <form name="Index"
            id="Index"
            @submit="checkForm">
          <SelectOption :searchParams="searchParams" :inputData="inputData"></SelectOption>
     
          </form>
</div>
     <b-row>
    <b-col md="10" class="my-1">
    </b-col>
    <b-col md="2" class="my-1">
        <div v-if=indexUrl.AddAllow>
     <b-button block variant="success" v-on:click="Addpage"  class="btn-pill">Add New </b-button>
        </div>
    </b-col>
    </b-row>   
  <!-- {{searchParams}} -->
    <b-table striped hover responsive head-variant="dark" foot-variant="dark" show-empty
             :items="items"
             :fields="fielddata"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             @filtered="onFiltered"
    >
<template slot ="index" slor-scopre ="row">
</template>
      <template slot="actions" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->

       <b-row>

           <div v-if=indexUrl.EditAllow>
          <b-button size="sm" variant="primary" @click.stop="edit(row.item)" class="mr-1">
          Edit
        </b-button>
               </div>
                   <div v-if=indexUrl.ViewAllow>
        <b-button size="sm" variant="warning" @click.stop="info(row.item, row.index, $event.target)" class="mr-1">
          View
        </b-button>
                   </div>
        <!-- <b-button size="sm" variant="warning" @click.stop="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'View' }} 
        </b-button> -->
                   <div v-if=indexUrl.DeleteAllow>
        <b-button size="sm"  variant="danger" @click.stop="openModal(row.item.id,row.index)"> Delete
        </b-button>
                   </div>

       </b-row>
      </template>

    </b-table>
<div>
   <b-col md="10" class="my-1">
    </b-col>
  </div>
<!-- pagination -->
<!-- {{gettotalrow}} -->
<pagination v-if="(gettotalrow>0)" :PaginationData=gettotalrow :perPage=perPage :offset=offset @paginnation="load"> </pagination>

<!-- Info modal -->
    <b-modal size="lg" id="modalInfo" @hide="resetModal" :title="modalInfo.title" ok-only>
      <div v-for="value in modalInfo.content">
        <div v-for="(value2,key) in value">
          <div v-if="key!='index' && key!='id' ">
          {{ key }}:{{ value2 }}
        </div>
        </div>
        </div>
    </b-modal>
    <!--</b-card>-->

   <b-modal title="Delete" class="modal-danger" v-model="dangerModal" @ok="Delete(modalData,i)" 
              @cancel-disabled="true"
              size="sm"               
             cancel-variant="primary"
             ok-variant="danger"
             >
              Are you sure to proceed
            </b-modal>
    </b-card>
    
  </b-container>
</template>

<script>
import CustomtableMixin from '@/shared/tables/CustomtableMixin.vue'

export default {
  mixins: [CustomtableMixin],
}
</script>

<!-- table-complete-1.vue -->
