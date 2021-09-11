<template>

    <div class="table-responsive">

        <b-table class="table table-bordered report-table" :fields="table_head" :items="table_data">
            <template slot="html_1" slot-scope="row">
                 <span v-html="row.value"></span>
            </template>
            <template slot="html_2" slot-scope="row">
                 <span v-html="row.value"></span>
            </template>
            <template slot="html_3" slot-scope="row">
                 <span v-html="row.value"></span>
            </template>
            <template slot="index" slot-scope="row" style="text-align:center;">{{ row.index + 1 + offset}}</template>
          <template slot="scheduleStatus" slot-scope="row">
            <span v-if="row.item.scheduleStatus === 'APPROVED'">
                  <b-badge title="Approved" variant="success">{{ row.item.scheduleStatus }}</b-badge>
                  &nbsp;<b-badge v-if="row.item.modify === 1" href="#" @click="emitModify(row.item)" title="Modify" variant="primary">Modify</b-badge>
                </span>
            <span v-else-if="row.item.scheduleStatus === 'PENDING' || row.item.scheduleStatus === 'MODIFIED'">
                 <b-badge title="Pending" variant="secondary">{{ row.item.scheduleStatus }}</b-badge>
                </span>
            <span v-else-if="row.item.scheduleStatus === 'FEEDBACK'">
                 <b-badge title="Feedback" variant="warning">{{ row.item.scheduleStatus }}</b-badge>
                </span>
            <span v-else-if="row.item.scheduleStatus === 'REJECTED'">
                 <b-badge title="Rejected" variant="danger">{{ row.item.scheduleStatus }}</b-badge>
                </span>
            <span v-else-if="row.item.scheduleStatus === 'PENDING_MODIFIED'">
                 <b-badge title="Pending Modified" variant="secondary">{{ row.item.scheduleStatus }}</b-badge>
                </span>
          </template>
            <template slot="status" slot-scope="row">
                <span v-if="row.item.status==1">
                <i title="Active" id="active_sign" class="fa fa-check-circle"></i>
                </span>
                <span v-else-if="row.item.status==0">
                 <i title="Inactive" id="inactive_sign" class="fa fa-close"></i>
                </span>

                <span v-else-if="row.item.status==2">
                 <i title="Terminated" id="terminateduser" class="fa fa-user"></i>
                <i id="terminatedclose" class="fa fa-close"></i>
                </span>
            </template>

            <template slot="actions" slot-scope="row">
                <div class="btn-action d-flex justify-center">

                <b-button
                  v-if="row.item.status_button==1"
                  id="viewbtn"
                  title="Change Status"
                  size="sm"
                  variant="success"
                  class="mr-1 btnpad"
                  @click="emitChange(row.item)"
                    >
                        <i class="fa fa-check"></i>

                </b-button>
                    <b-button
                            v-if="row.item.status_button==0"
                            id="viewbtn"
                            title="Change Status"
                            size="sm"
                            variant="danger"
                            class="mr-1 btnpad"
                            @click="emitChange(row.item)"
                    >
                        <i class="fa fa-ban"></i>
                    </b-button>


                    <b-button
                            id="viewbtn"
                            v-if="row.item.view"
                            title="View"
                            size="sm"
                            variant="primary"
                            class="mr-1 btnpad"
                            @click="emitView(row.item)"
                    >
                       <i class="fa fa-eye"></i>
                    </b-button>
                    <b-button
                            v-if="row.item.signatory_button==0"
                            id="signatorybtn"
                            title="Change signatory"
                            size="sm"
                            variant="danger"
                            class="mr-1 btnpad"
                            @click="emitChange(row.item)"
                    >
                        <i class="fa fa-ban"></i>
                    </b-button>


                    <b-button
                            id="signatorybtn"
                            v-if="row.item.signatory"
                            title="Signatory"
                            size="sm"
                            variant="primary"
                            class="mr-1 btnpad"
                            @click="emitSignatory(row.item)"
                    >
                        <i class="fa fa-square"></i>
                    </b-button>

                    <b-button
                            v-if="row.item.edit"
                            id="editbtn"
                            title="Edit"
                            size="sm"
                            variant="warning"
                            class="mr-1 btnpad"
                            @click="emitEdit(row.item)"
                    >
                        <i class="fa fa-edit"></i>
                    </b-button>
                    <b-button
                            v-if="row.item.submit==1"
                            id="submitBtn"
                            title="Submit"
                            size="sm"
                            variant="success"
                            class="mr-1 btnpad"
                            @click="emitApprove(row.item)"
                    >
                        <i class="fa fa-check"></i>
                    </b-button>
                    <b-button
                            v-if="row.item.reject==1"
                            title="Reject"
                            size="sm"
                            variant="danger"
                            class="mr-1 btnpad"
                            @click="emitReject(row.item)"
                    >
                        <i class="fa fa-ban"></i>
                    </b-button>
                    <b-button
                            v-if="row.item.approve===1"
                            title="Approve"
                            size="sm"
                            variant="danger"
                            class="mr-1 btnpad"
                            @click="emitApprove(row.item)"
                    >
                        <i class="fa fa-paper-plane-o"></i>
                    </b-button>
                    <b-button
                            v-if="row.item.loan_disburse==1"

                            title="Loan Disburse"
                            size="sm"
                            variant="light"
                            class="mr-1 btnpad"
                            @click="emitDisburse(row.item)"
                    >

                        <img src="http://localhost/trunk/media/images/disburse.png" border="0">
                    </b-button>

                    <b-button
                            v-if="row.item.delete"
                            id="deletebtn"
                            title="Delete"
                            size="sm"
                            variant="danger"
                            class="mr-1 btnpadd"
                            @click="emitDelete(row.item)"
                    >
                        <i class="fa fa-trash"></i>
                    </b-button>
                    <b-button
                            v-if="row.item.delete_all"
                            id="deletebtn"
                            title="Delete All"
                            size="sm"
                            variant="danger"
                            class="mr-1 btnpadd"
                            @click="emitDeleteAll(row.item)"
                    >
                        <i class="fa fa-trash"></i> all
                    </b-button>
                    <b-button
                            v-if="row.item.locked===1"
                            id="lockbtn"
                            title="Locked.Click to unlock"
                            size="sm"
                            variant="primary"
                            class="mr-1 btnpadd"
                            @click="emitLock(row.item,row.index)"
                    >
                        <i class="fa fa-lock fa-lg"></i>
                    </b-button>
                    <div v-if="row.item.isCustomActionButton">
                        <span v-for="(btn, key) in row.item.customActionButton" :key="key">
                        <span v-if="btn.is_button === false"><i style="font-size:18px;" :style="btn.style" class="fa-lg fa" :class="btn.icon"></i>&nbsp;</span>
                        <b-button v-else
                            :id="key"
                            :title="btn.name"
                            :disabled="!!(btn.is_disabled)"
                            size="sm"
                            :variant="btn.variant"
                            class="mr-1 btnpad"
                            @click="emitCustomBtn(row.item, key)"
                    >
                        <i class="fa" :class="btn.icon"></i>{{(btn.name_show) ? "&nbsp;"+ btn.name: ""}}
                    </b-button>
                        </span>
                    </div>
                </div>
            </template>
            <Loading :show="loading_show"></Loading>
        </b-table>
    </div>
</template>

<script>
  import '@/shared/common/confirm-message.js';
  import Loading from 'vue-full-loading';

  export default {
        name: "CommonIndex",
        props: {
            table_data: {type: Array, required: true},
            table_head: {type: Array, required: true},
            offset: {type: Number, required: true},
            delete_info: {type: Array, required: false},
            is_common_delete:{default:true}
        },
        components: { Loading },
        data() {
            return {
                loading_show: false,
            }
        },
        methods: {
            emitView(itemdata) {
                itemdata['action_type']="view";

                this.$emit("view", itemdata);
            },
            emitEdit(itemdata) {
                itemdata['action_type']="edit";
                this.$emit("edit", itemdata);
            },
            emitSignatory(itemdata) {
                itemdata['action_type']="signatory";
                this.$emit("signatory", itemdata);
            },
            emitDelete(itemdata) {
                this.loading_show = true;
                if(this.is_common_delete === true) {
                    let delete_data = this.$props.delete_info;
                    let id = itemdata.id;
                    if(delete_data[0].source === 'service') {
                        this.confirmMessageService(id, delete_data, true);
                    } else {
                        this.confirmMessage(id, delete_data, true);
                    }
                } else {
                    this.$emit("delete", itemdata);
                }
                this.loading_show = false;
            },
            emitDeleteAll(itemdata) {
                this.$emit("deleteAll", itemdata);
            },
            emitApprove(itemdata) {
                this.$emit("approve", itemdata);
            },
            emitModify(itemdata) {
                this.$emit("modify", itemdata);
            },
            emitReject(itemdata) {
                this.$emit("reject", itemdata);
            },
            emitUnapprove(itemdata) {
                this.$emit("unapprove", itemdata);
            },
            emitDisburse(itemdata) {
                this.$emit("disburse", itemdata);
            },
            emitLock:function (itemdata) {
                this.$emit("lock", itemdata);

            },
            emitAddInterest:function (itemdata) {
                this.$emit("addInterest", itemdata);
            },
            emitChange:function (itemdata) {
                this.$emit("changeStatus", itemdata);
            },
            emitCustomBtn:function (itemdata, key) {
                this.$emit("customActionButton", itemdata, key);
            },
            emitChangeFirstRepayDate:function (itemdata) {
                this.$emit("changeDate", itemdata);
            }
        }
    };
</script>
<style>
    .c-icon{
        font-size: 18px;
        text-align: center;
        display: block;
    }
    #active_sign, #active_sign_2{
        font-size: 20px;
        color: green;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #inactive_sign,#inactive_sign_2 {
        font-size: 20px;
        color: red;
        display: flex;
        align-items: center;
        justify-content: center;

    }

    #terminateduser {
        font-size: 15px;

    }

    #terminatedclose {
        color: red;
    }

    .btnpad {
        padding: 0.12rem .18rem;
    }

    .btnpadd {
        padding: 0.8rem .10rem;
    }
    .btn-action{

        display: flex;
        align-items: center;
        justify-content: center;
    }
    .icons{
        display: flex;
        align-items: center;
        justify-content: center;
    }


</style>
