<template>
    <div class="mb-3">
        <b-row>
            <b-col lg="3" v-for="(row, key) in branch_card" :key="key">
                <WidgetOne :card_info="row"></WidgetOne>
            </b-col>
        </b-row>
        
        <!-- <b-row>
            <TrendChart :branch_list = "branch_list"></TrendChart>
        </b-row> -->
      
        <b-row>
            <KpiChart></KpiChart>
        </b-row>
       
        <b-row>
            <!-- <b-col lg="6">
                <BranchValue></BranchValue>
            </b-col>
            <b-col lg="6">
                <BranchStatus></BranchStatus>
            </b-col>
            <b-col lg="12">
                <a style="float:right;cursor: pointer;color: green;font-weight: bold;margin-right: 50px;margin-top: -10px;padding-bottom: 5px;" @click="branchStatusAndBranchType">More...</a>
            </b-col> -->

            <!-- <b-col lg='12'>
                <div class="card">
                    <div class="card-body">
                <div class="table_temporary mb-3">
                    <div class="table_temporary_title"> 
                        <h5><i class="fa fa-th-list">&nbsp;</i>Audits List</h5>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-bordered report-table table b-table">
                            <thead>
                                <tr>
                                <th scope="col" class="text-center">#</th>
                                <th scope="col">Project Name</th>
                                <th scope="col" class="text-center">Priority</th>
                                <th scope="col">Start Date</th>
                                <th scope="col" class="text-center">Due Date</th>
                                <th scope="col" class="text-center">Status</th>
                                <th scope="col" class="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row" class="text-center">DS101</th>
                                    <td>Reliable-Possible</td>
                                    <td class="text-center"><img src="/img/prio2.png" width="20px" height="20px"></td>
                                    <td class="text-center">07-03-2019</td>
                                    <td class="text-center">10-03-2019</td>
                                    <td class="text-center"><b-button pill variant="outline-success" size="sm" style="border-radius: 15px !important;">Active</b-button></td>
                                    <td class="text-center"><i class="fa fa-eye fa-2x icon_color_temp"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-pencil fa-2x icon_color_temp"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-trash fa-2x icon_color_temp"></i></td>
                                </tr>
                                <tr>
                                    <th scope="row" class="text-center">DS102</th>
                                    <td>Reliable-Possible</td>
                                    <td class="text-center"><img src="/img/prio2.png" width="20px" height="20px"></td>
                                    <td class="text-center">07-03-2019</td>
                                    <td class="text-center">09-03-2019</td>
                                    <td class="text-center"><b-button pill variant="outline-danger" size="sm" style="border-radius: 15px !important;">Closed</b-button></td>
                                    <td class="text-center"><i class="fa fa-eye fa-2x icon_color_temp"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-pencil fa-2x icon_color_temp"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-trash fa-2x icon_color_temp"></i></td>
                                </tr>
                           
                                <tr>
                                    <th scope="row" class="text-center">DS104</th>
                                    <td>Environment Monitoring</td>
                                    <td class="text-center"><img src="/img/prio4.png" width="20px" height="20px"></td>
                                    <td class="text-center">08-04-2019</td>
                                    <td class="text-center">09-04-2019</td>
                                    <td class="text-center"><b-button pill variant="outline-warning" size="sm" style="border-radius: 15px !important;">Warning</b-button></td>
                                    <td class="text-center"><i class="fa fa-eye fa-2x icon_color_temp"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-pencil fa-2x icon_color_temp"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-trash fa-2x icon_color_temp"></i></td>
                                </tr>
                                <tr>
                                    <th scope="row" class="text-center">DS105</th>
                                    <td>Reliable-Possible</td>
                                    <td class="text-center"><img src="/img/prio2.png" width="20px" height="20px"></td>
                                    <td class="text-center">07-03-2019</td>
                                    <td class="text-center">10-03-2019</td>
                                    <td class="text-center"><b-button pill variant="outline-success" size="sm" style="border-radius: 15px !important;">Active</b-button></td>
                                    <td class="text-center"><i class="fa fa-eye fa-2x icon_color_temp"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-pencil fa-2x icon_color_temp"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-trash fa-2x icon_color_temp"></i></td>
                                </tr>
                                <tr>
                                    <th scope="row" class="text-center">DS106</th>
                                    <td>Reliable-Possible</td>
                                    <td class="text-center"><img src="/img/prio4.png" width="20px" height="20px"></td>
                                    <td class="text-center">07-03-2019</td>
                                    <td class="text-center">10-03-2019</td>
                                    <td class="text-center"><b-button pill variant="outline-success" size="sm" style="border-radius: 15px !important;">Active</b-button></td>
                                    <td class="text-center"><i class="fa fa-eye fa-2x icon_color_temp"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-pencil fa-2x icon_color_temp"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-trash fa-2x icon_color_temp"></i></td>
                                </tr>
                                <tr>
                                    <th scope="row" class="text-center">DS107</th>
                                    <td>Reliable-Possible</td>
                                    <td class="text-center"><img src="/img/prio4.png" width="20px" height="20px"></td>
                                    <td class="text-center">07-03-2019</td>
                                    <td class="text-center">10-03-2019</td>
                                    <td class="text-center"><b-button pill variant="outline-success" size="sm" style="border-radius: 15px !important;">Active</b-button></td>
                                    <td class="text-center"><i class="fa fa-eye fa-2x icon_color_temp"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-pencil fa-2x icon_color_temp"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-trash fa-2x icon_color_temp"></i></td>
                                </tr>
                                <tr>
                                    <th scope="row" class="text-center">DS108</th>
                                    <td>Deep Space-Possible</td>
                                    <td class="text-center"><img src="/img/prio2.png" width="20px" height="20px"></td>
                                    <td class="text-center">07-03-2019</td>
                                    <td class="text-center">10-03-2019</td>
                                    <td class="text-center"><b-button pill variant="outline-danger" size="sm" style="border-radius: 15px !important;">Closed</b-button></td>
                                    <td class="text-center"><i class="fa fa-eye fa-2x icon_color_temp"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-pencil fa-2x icon_color_temp"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-trash fa-2x icon_color_temp"></i></td>
                                </tr>
                                <tr>
                                    <th scope="row" class="text-center">DS109</th>
                                    <td>Reliable-Possible</td>
                                    <td class="text-center"><img src="/img/prio2.png" width="20px" height="20px"></td>
                                    <td class="text-center">07-03-2019</td>
                                    <td class="text-center">10-03-2019</td>
                                    <td class="text-center"><b-button pill variant="outline-warning" size="sm" style="border-radius: 15px !important;">Warning</b-button></td>
                                    <td class="text-center"><i class="fa fa-eye fa-2x icon_color_temp"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-pencil fa-2x icon_color_temp"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-trash fa-2x icon_color_temp"></i></td>
                                </tr>
                                <tr>
                                    <th scope="row" class="text-center">DS1010</th>
                                    <td>Reliable-Possible</td>
                                    <td class="text-center"><img src="/img/prio3.png" width="20px" height="20px"></td>
                                    <td class="text-center">07-03-2019</td>
                                    <td class="text-center">10-03-2019</td>
                                    <td class="text-center"><b-button pill variant="outline-success" size="sm" style="border-radius: 15px !important;">Active</b-button></td>
                                    <td class="text-center"><i class="fa fa-eye fa-2x icon_color_temp"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-pencil fa-2x icon_color_temp"></i>&nbsp;&nbsp;&nbsp;<i class="fa fa-trash fa-2x icon_color_temp"></i></td>
                                </tr>
                               
                                
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
                </div>
            </b-col> -->
        </b-row>
    </div>
</template>
<script src="@/components/services/dashboard/branch/Index.js"></script>
