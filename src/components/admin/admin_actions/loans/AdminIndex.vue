
<template>
    <div class="animated fadeIn entry-list">
        <b-row>
            <b-col xs="12" lg="12">
                <div class="search">
                    <fieldset>
                        <legend>Search</legend>
                        <b-form inline id="userform" @submit.prevent="GetFormData" autocomplete="off">

                            <select  :disabled="branch_type=='B'" class="form-control mb-2 mr-sm-2 mb-sm-0 col-md-2" title="Branch" v-model="branch_id" @change="getRelativeSamity()">
                                <option
                                        v-for="option in branches"
                                        :value="option.branch_id"
                                        :key="option.branch_id"

                                >{{ option.branch_code}} - {{ option.branch_name}}
                                </option>
                            </select>

                            <select class="form-control mb-2 mr-sm-2 mb-sm-0 col-md-2" title="Samity" v-model="samity_id">
                                <option value="">Select Samity</option>
                                <option
                                        v-for="option in samities"
                                        :value="option.id"
                                        :key="option.id"

                                >{{ option.code}} - {{ option.name}}
                                </option>
                            </select>

                            <select cols="3" class="form-control mb-2 mr-sm-2 mb-sm-0 col-md-2" title="Loan Product" v-model="product_id">
                                <option value="">Select Product</option>
                                <option
                                        v-for="option in products"
                                        :value="option.product_id"
                                        :key="option.product_id"

                                >{{ option.product_mnemonic}} - {{ option.funding_org_name}}
                                </option>
                            </select>

                            <b-form-input
                                    v-model="name"
                                    type="text"
                                    class=" form-control mb-2 mr-sm-2 mb-sm-0"
                                    placeholder="By Loan Name/Code"
                                    title="By Loan Name/Code"
                                    size="sm"
                            ></b-form-input>
                            <select class="form-control mb-2 mr-sm-2 mb-sm-0" title="Loan Status" v-model="loan_status">
                                <option value="">Select Status</option>
                                <option value="1">Open</option>
                                <option value="2">Closed</option>

                            </select>

                            <select class="form-control mb-2 mr-sm-2 mb-sm-0 col-md-2" title="Repayment Frequency" v-model="repayment_frequency">
                                <option
                                        v-for="(option,key) in reparment_frequencies"
                                        :value="key"
                                        :key="key"

                                >{{ option}}
                                </option>
                            </select>

                            <b-button type="submit" class="right-all mr-2" variant="success" size="sm" >
                                <i class="fa fa-search fa-sm"></i>&nbsp;{{ $t("search") }}
                            </b-button>
                            <b-button class="right-all mr-2" type="button" variant="warning" size="sm" @click.prevent="resetSearch()">
                                <i class="fa fa-refresh fa-sm"></i>&nbsp;{{ $t("reset") }}
                            </b-button>

                        </b-form>
                    </fieldset>
                </div>
                <b-card>
                    <CustomModal size="lg" v-if="isModalVisible" @close="closeModal"
                                 :componentAddress="component_address" :title="title" :id="edit_id"></CustomModal>
                    <div slot="header">
                        <h5>
                            <i class="fa fa-th-list fa-sm"></i>&nbsp;Loans
                        </h5>
                        <b-button
                                type="button"
                                title="Add Loan"
                                variant="success"
                                size="sm"
                                class="add"
                                @click="openRegularLoanAdd()"
                        >
                            <i class="fa fa-plus-circle fa-sm"></i>{{ $t("add") }}
                        </b-button>
                    </div>
                    <!--<div>
                        <CommonIndex  :table_data="loans_array"
                                     :table_head="head_information" :offset="offset" :delete_info="delete_info"  v-on:delete="loadData" v-on:changeDate="changeFirstRepayDate"></CommonIndex>
                    </div>-->
                    <div class="table-responsive">
                        <table class="table table-bordered report-table">
                            <thead class="thead-dark">
                            <th>#</th>
                            <th>Loan Code</th>
                            <th>Member Code</th>
                            <th>Member name</th>
                            <th>Loan Amount</th>
                            <th>Total Repay Amount</th>
                            <th>Interest Rate</th>
                            <th>Disburse Date</th>
                            <th>Frist Repayment Date</th>
                            <th>Number Of Installment</th>
                            <th>Auth. Status</th>
                            <th>Loan Status</th>
                            <th>Entry By</th>
                            <th>Actions</th>
                            </thead>
                            <tbody v-for="(row,index) in loans_array">
                            <td>{{index + 1 + offset}}</td>
                            <td>{{row.loan_code}}</td>
                            <td>{{row.member_code}}</td>
                            <td>{{row.member_name}}</td>
                            <td>{{row.loan_amount}}</td>
                            <td>{{row.total_payable_amount}}</td>
                            <td>{{row.interest_rate}}</td>
                            <td>{{row.disburse_date}}</td>
                            <td v-if="row.first_repay_edit==0">
                                {{row.first_repayment_date}}
                            </td>
                            <td v-if="row.first_repay_edit==1">

                                <div v-on:dblclick="openInput(row.first_repayment_date,index)">
                                    {{row.first_repayment_date}}
                                </div>
                                <date-picker v-if="open_date_picker_number==index" :onChange="changeFirstRepayDate(row.first_repayment_date,first_repay_date,row.id,row.branch_id,row.samity_id,index)" title="Change First Repayment Date" name="txt_date_from" date-format="yy-mm-dd" :value="row.first_repayment_date"  v-model = "first_repay_date" placeholder="Change First Repayment Date"></date-picker>

                            </td>
                            <td>{{row.number_of_installment}}</td>
                            <td v-if="row.status==1"><span>
                                                    <i title="Authorised" id="active_sign" class="fa fa-check-circle"></i>
                                                    </span></td>
                            <td v-if="row.status==0"><span>
                                                    <i title="not Authorised" id="inactive_sign" class="fa fa-close"></i>
                                                    </span></td>
                            <td>{{row.current_status}}</td>
                            <td>{{row.disburse_by}}</td>

                            <td>
                                <div class="btn-action">
                                    <b-button
                                            id="viewbtn"
                                            v-if="row.view"
                                            title="View"
                                            size="sm"
                                            variant="primary"
                                            class="mr-1 btnpad"
                                            @click="emitView(row.id)"
                                    >
                                        <i class="fa fa-search"></i>
                                    </b-button>
                                    <div v-if="row.edit==1">
                                        <b-button
                                                v-if="row.edit"
                                                id="editbtn"
                                                title="Edit"
                                                size="sm"
                                                variant="warning"
                                                class="mr-1 btnpad"
                                                @click="doedit(row)"
                                        >
                                            <i class="fa fa-edit"></i>
                                        </b-button>
                                    </div>
                                    <!--<div v-if="row.delete==1">-->
                                        <!--<b-button-->
                                                <!--v-if="row.delete"-->
                                                <!--id="deletebtn"-->
                                                <!--title="Delete"-->
                                                <!--size="sm"-->
                                                <!--variant="danger"-->
                                                <!--class="mr-1 btnpadd"-->
                                                <!--@click="dodelete(row)"-->
                                        <!--&gt;-->
                                            <!--<i class="fa fa-trash"></i>-->
                                        <!--</b-button>-->
                                    <!--</div>-->
                                </div>
                            </td>


                            </tbody>

                        </table>
                    </div>

                    <loading
                            :show="loading_show"
                            :label="loading_label">
                    </loading>

                    <div>

                        <Pagination v-if="(total_rows>0)" :paginationData=total_rows
                                    @pagination="loadData"></Pagination>
                    </div>

                </b-card>

            </b-col>
        </b-row>

    </div>
</template>
<style>
    .right-all
    {
        float: right;
    }
    #active_sign, #active_sign_2{
        font-size: 20px;
        color: green;
    }

    #inactive_sign,#inactive_sign_2 {
        font-size: 20px;
        color: red;
    }
    .swal-wide{
        width:400px !important;
    }
</style>
<script src="@/components/services/admin/admin_actions/AdminIndex.js">
</script>



