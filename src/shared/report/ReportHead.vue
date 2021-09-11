<template>
    <div class="report_head" ><!-- Need to add v-if from session -->
        <h2>{{ HeaderData.po_name }}</h2>
        <h4>{{ HeaderData.report_header_line_1 }}</h4>
        <h6>{{ HeaderData.address }}</h6>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "ReportHead",
        data() {
            return {
                HeaderData: []
            }
        },
        mounted() {
            this.getHeader();
        },
        methods: {
            getHeader: function(){
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
                data.append('session_data',JSON.stringify(session_data));
                this.$axios.post('/reports/report_header',data).then(response => {
                    this.HeaderData = response.data.header_data;
                })
            }
        }
    }
</script>

<style scoped>
    .report_head{
        text-align: center;
    }

</style>
