<template>
    <div class="animated fadeIn entry-list">
        <b-row>
            <b-col xs="12" lg="12">
                <div class="search">
                    <fieldset>
                        <legend>Information</legend>
                        <p>
                            <b>Microfin360 version:</b> <br/>
                            <b>Framework version:</b> <br/>
                            <b>Platform:</b> <br/>
                            <b>PHP version:</b> <br/>
                            <b>Database Host:</b>
    {{component_address}}
                        </p>
                    </fieldset>
                </div>
                <b-card>
                    <div class="table-responsive">
                        <table class="table table-bordered report-table">
                            <thead>
                            <tr>
                                <th style="width: 5%">#</th>
                                <th style="width: 25%">{{ $t("admin_actions") }}</th>
                                <th style="width: 60%">{{ $t("admin_actions_description") }}</th>
                                <th style="width: 10%">{{ $t("action") }}</th>
                                <th v-show="false">{{prev_module_name=""}}</th>
                            </tr>
                            </thead>
                            <tbody v-for="(info, key) in rows" :key="key">
                                <tr>
                                    <td colspan='4' v-if="prev_module_name != info['module']" class='mid_separator'>{{info['module']}}</td>
                                </tr>
                                <tr>
                                    <td class="serial" align="center">{{'#'}}</td>
                                    <td>{{info['title']}}</td>
                                    <td>{{(info['description'])?info['description']:''}}</td>
                                    <td align="center" @click="controller_action(info['action'], info['component_name'], info['title'])">
                                        <i class="fa fa-edit fa-sm " style="font-size:15px;color:#2f96b4;"></i>
                                    </td>
                                </tr>
                                <tr v-show="false">{{prev_module_name=info['module']}} </tr>
                            </tbody>
                        </table>
                        <Loading :show="loading_show"></Loading>
                    </div>

                    <CustomModal size="md" v-if="isModalVisible"
                                 :componentAddress="component_address" :title="title" :id="edit_id">
                    </CustomModal>
                </b-card>
            </b-col>
        </b-row>

    </div>

</template>


<script src="@/components/services/admin/admin_actions/Index.js"></script>
<style scoped>
    td.mid_separator{
        background: #f6f8f9; /* Old browsers */
        background: -moz-linear-gradient(top,  #f6f8f9 0%, #e5ebee 50%, #d7dee3 51%, #f5f7f9 100%); /* FF3.6+ */
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f6f8f9), color-stop(50%,#e5ebee), color-stop(51%,#d7dee3), color-stop(100%,#f5f7f9)); /* Chrome,Safari4+ */
        background: -webkit-linear-gradient(top,  #f6f8f9 0%,#e5ebee 50%,#d7dee3 51%,#f5f7f9 100%); /* Chrome10+,Safari5.1+ */
        background: -o-linear-gradient(top,  #f6f8f9 0%,#e5ebee 50%,#d7dee3 51%,#f5f7f9 100%); /* Opera 11.10+ */
        background: -ms-linear-gradient(top,  #f6f8f9 0%,#e5ebee 50%,#d7dee3 51%,#f5f7f9 100%); /* IE10+ */
        background: linear-gradient(to bottom,  #f6f8f9 0%,#e5ebee 50%,#d7dee3 51%,#f5f7f9 100%); /* W3C */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f6f8f9', endColorstr='#f5f7f9',GradientType=0 ); /* IE6-9 */
        color: #388EE8;
        text-align: center;
        font-weight: bold;
        text-shadow: 1px 2px 3px #959595;
        height: 20px;
    }
</style>
