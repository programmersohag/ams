<template>
    <div>
        <b-row>
             <b-col lg="6" >
                <BranchWiseSavingChart></BranchWiseSavingChart>
                
            </b-col>

            <b-col lg="6" >
                <b-row>
                    <b-col lg="6" v-for="(row, key) in branch_card" :key="key">
                         <WidgetFive :card_info="row"></WidgetFive>
                    </b-col>
                </b-row>
               
            </b-col>
        </b-row>
        <hr>
        <b-row>
            <KpiChart></KpiChart>
        </b-row>
        <b-row>
           
           <TrendChart :branch_list = "branch_list"></TrendChart>
        </b-row>
        <b-row>
          
            <b-col lg="6">
                <BranchValue></BranchValue>
            </b-col>
            <b-col lg="6">
               
                 <BranchStatus></BranchStatus>
            </b-col>
            
        </b-row>
       
       
       
    </div>
</template>
<script src="@/components/services/dashboard/branch/Index.js"></script>

<style >

  .tabs div > ul {

      background-color: var(--mega_menu_background_color);
      color: var(--font-color);

  }

</style>
