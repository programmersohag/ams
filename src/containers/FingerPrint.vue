<template>
    <!--<div class="col-md-12">-->
        <!--<div class="col-md-3"><img class="navbar-brand-minimized" src="img/left_thumb.png" width="30" height="30" alt="Left Thumb"></div>-->
        <!--<div class="col-md-3"><img class="navbar-brand-minimized" src="img/left_index.png" width="30" height="30" alt="Left Index"></div>-->
        <!--<div class="col-md-3"><img class="navbar-brand-minimized" src="img/right_thumb.png" width="30" height="30" alt="Right Thumb"></div>-->
        <!--<div class="col-md-3"><img class="navbar-brand-minimized" src="img/right_index.png" width="30" height="30" alt="Right Index"></div>-->
    <!--</div>-->
    <b-form-group  label-size="sm"
                  :label='this.$t("finger_print")+this.valid_star'
                  label-for="txt_finger_template"
                  :label-cols="4"
                  :horizontal="true"
    >
        <div>

            <img  class="navbar-brand-minimized" :src="finger_scanner_src" height="80"
                  alt="Finger Print">

            &nbsp;&nbsp;
            <b-button size="sm" variant="primary" class="mr-2" @click.prevent="fingerIdentification"><i
                    class="fa fa-close fa-lg mt-1.9"></i>{{ $t("scan") }}
            </b-button>

        </div>

        <span v-if="formErrors['finger'] == 'Verified'"
              class="text-success">{{ formErrors['finger'] }}</span>
        <span v-else
              class="text-danger">{{ formErrors['finger'] }}</span>
        <span v-if="formErrors['txt_finger_template'] " class="text-danger">{{ formErrors['txt_finger_template'] }}</span>
    </b-form-group>
</template>

<script>
    import API from "@/shared/common/API.js";
    var memberAPI = new API();
    memberAPI.createEntity({name: "members"});
    let memberApiEndPoint = memberAPI.endpoints.members;
    export default {
        name: "FingerPrint",
        data () {
            return {
                valid_star: '<span class="required">*</span>',
                lastClicked: 'click on something!',
                finger_print_array: [],
                finger_scanner_src: 'img/fingerprint_scan.png',
                formErrors: {
                    finger:""
                },
                inputForm: {
                    member_id: ''
                },
            }
        },
        methods: {
            handleClick (item) {

            },
            getFingerPrint: function () {
                if (this.inputForm.member_id > 0) {
                    let params = {}
                    params['member_id'] = this.inputForm.member_id
                    memberApiEndPoint.getRequest("ajax_for_get_member_finger_print", params)
                        .then(response => {
                            this.finger_print_array = response.data.templates
                        })
                        .catch(function (error) {
                            console.log(error.response);
                        })
                }
            },
            fingerIdentification: function () {
                this.formErrors.finger = ""
                let params = {}
                params = JSON.stringify(this.finger_print_array);
                const options = {
                    method: 'POST',
                    headers: {'Authorization': 'Bearer '+"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjVkMzg0YWJlNTk0NDA5YmI2Y2QwNmQ1ZDA4YzZkOTYxZjdiYmFmYzRmYzY2YzllMTZjOThkNjY3MjEwYzdjZGQ5NDJjYTY0MzJkNjRjYjRmIn0.eyJhdWQiOiIxIiwianRpIjoiNWQzODRhYmU1OTQ0MDliYjZjZDA2ZDVkMDhjNmQ5NjFmN2JiYWZjNGZjNjZjOWUxNmM5OGQ2NjcyMTBjN2NkZDk0MmNhNjQzMmQ2NGNiNGYiLCJpYXQiOjE1NjMzNTUyMjMsIm5iZiI6MTU2MzM1NTIyMywiZXhwIjoxNTk0OTc3NjIzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.dPT94pPcqV5GdscSkCq_vZflf7A4XgucH7bEQPxunpA6qBb1SrivaEt7TviLBg3kkGCnfkmiEHlcsjGc1a2XA5ZDLUK55YAzoNHEZMze8l-wtSENKCYvSzOk86L9LK9vEDsQgb1nX82yhqWNhIHhuoISbkXFmBbA4hsMKsMhilQ8oFLYXNpEJSvVg3b8OUgDiPNsoVY55XfCudx7vNb54N_7oTltdX8K81wB-t3wPzYElAXJcN_GJCXrqpx6Y78qY25PZ5eNfyl2C1uI2YQhQyTUI5K8zETPqD7Gch52eceP40w1XHjwHri6zDGgqHUjWXWPiPbGqqPDq1fQtCwtz1M2Y2_IbDFBr2UTZtdTnz2ZpbbFVIDdXQMUZzNGQigiY7Q9OQ9pB7GRdpPXc0UuRCqLFd0GtNOZJWjPnH2FcykZzlszWHcAf7c5cWHSIvFAtS79o2pJsIr7XL7M_PxkFhtxe8yCg9KAQgeBhD3-Nbgt4otbmCox0OjNWdTOZJDVVrnL0ZeSuaveaEPI6UHIPhIkp_758uLQbe1WctJznCLFRZrholSa9BlLfQZy-QXRTe5bfiszQus2mt7ZDAgRUXY19j6FvwJaAuZIxQyRSP9u1GPM0aotC_VTbQ9daG5CpBB-RHB69XH5PgMfYdHV2MK4zaUzHvwgnceU7nzd7VM",
                        'content-type': 'application/json'},

                    url: "http://localhost:9111/verify",
                };
                this.$axios(options)
                    .then(res => {
                        console.log(res);
                    });
            },
        }
    }
</script>

<style scoped>

</style>