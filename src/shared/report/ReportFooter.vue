<template>
    <div v-if="FooterData.is_signatory_option_enable=='1'">
        <table id="report_footer_table" width="100%" border="0" cellspacing="0">
            <tr v-for="item in i">
                <div v-for="item2 in j">
                    <td nowrap="nowrap"><strong>{{ pomis_footer_l(item,item2) }}</strong></td>
                    <td nowrap="nowrap"><strong>{{ pomis_footer_l(item,item2) }}</strong></td>
                    <td nowrap="nowrap" width="33%">{{ pomis_footer_v(item,item2) }}</td>
                </div>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
        </table>
    </div>
    <div v-else>
        <div v-if="branch_id > 0">
            <table id="report_footer_table" width="100%" border="0" cellspacing="0">
                <tr>

                    <td><strong>Signature&nbsp;:</strong></td>
                    <td><strong>Signature&nbsp;:&nbsp;:</strong></td>
                    <td><strong>Signature&nbsp;:&nbsp;:</strong></td>
                </tr>

                <tr>

                    <td nowrap><strong>Chief&nbsp;Accountant&nbsp;Name&nbsp;:</strong></td>
                    <td nowrap><strong>Chief&nbsp;Credit&nbsp;Officer&nbsp;name&nbsp;:</strong></td>
                    <td nowrap><strong>Chief&nbsp;Executive&nbsp;Name&nbsp;:</strong></td>
                </tr>

                <tr>

                    <td><strong>Designation&nbsp;:</strong></td>
                    <td><strong>Designation&nbsp;:</strong></td>
                    <td><strong>Designation&nbsp;:</strong></td>
                </tr>
                <tr>

                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
            </table>
        </div>
        <div v-else>
            <table id="report_footer_table" width="100%" border="0" cellspacing="0">
                <tr>
                    <td nowrap="nowrap"><strong>Prepared By&nbsp;: </strong></td>
                    <td nowrap="nowrap"><strong>Verified By&nbsp;: </strong></td>
                    <td nowrap="nowrap"><strong>Approved By&nbsp;:</strong></td>
                </tr>

                <tr>
                    <td><strong>Signature&nbsp;:</strong></td>
                    <td><strong>Signature&nbsp;:</strong></td>
                    <td><strong>Signature&nbsp;:</strong></td>
                </tr>


                <tr>

                    <td><strong>Designation&nbsp;:</strong></td>
                    <td><strong>Designation&nbsp;:</strong></td>
                    <td><strong>Designation&nbsp;:</strong></td>
                </tr>
                <tr>

                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
            </table>
        </div>
    </div>

</template>

<script>
    import axios from 'axios'
    export default {
        name: "ReportFooter",
        data() {
            return {
                FooterData: [],
                branch_id: '',
                i: 3,
                j: 3,
            }
        },
        mounted() {
            this.getFooter();
        },
        methods: {
            getFooter: function(){
                var data = new FormData();
                var session_data = {
                    id: 5,
                    login: 'ds.001',
                    name: 'Datasoft Support Kalitara',
                    logged_id: 1,
                    role_id: 1,
                    branch_id: 2,
                    branch_name: 'Kalitara',
                    end_time: '',
                    is_head_office: 0,
                    branch_type: 'B',
                    is_super_admin: '',
                    default_language: 'english',
                    current_date: '2018-11-29'
                };
                this.branch_id = 0;
                data.append('session_data',JSON.stringify(session_data));
                this.$axios.post('/reports/report_footer',data).then(response => {
                    this.FooterData = response.data;
                    console.log(this.FooterData)
                    console.log(this.branch_id)
                })
            },
            pomis_footer_l: function (a,b) {
                var str = 'pomis_footer' + a + '_l_' + b;
                if(this.FooterData[str]){
                    return this.FooterData[str]
                }
            },
            pomis_footer_v: function (a,b) {
                var str = 'pomis_footer' + a + '_v_' + b;
                if(this.FooterData[str]){
                    return this.FooterData[str]
                }
            }
        }
    }
</script>

<style scoped>

</style>
