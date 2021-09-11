import FormGenerator from "@/containers/form_generators/FormGenerator";
import API from "@/shared/common/API.js";
import CustomModal from '@/containers/Modal';
import FormError from "@/containers/FormError";
import {getCommonOptions}  from '@/shared/options/generate.js';

export default {
        props:{ data: Object },

    components: {
        CustomModal,
        FormError,
        FormGenerator
    },

    data() {
        return {
            schema: {
                header: {
                    fieldType: "TextAreaInput",
                    fieldName: "header",
                    label: this.$t("Question"),
                    placeholder: this.$t("question"),
                    vvalidate: "required",
                    id: "header"
                },
                answer: {
                    fieldType: "TextAreaInput",
                    fieldName: "answer",
                    label: this.$t("answer"),
                    placeholder: this.$t("answer"),
                    vvalidate: "required",
                    id: "answer"
                },
                status: {
                    fieldType: "SelectList",
                    fieldName: "status",
                    label: this.$t("status"),
                    vvalidate: "required",
                    horizontal:"true",
                    id: "status",
                    options: {},
                    //onChange: false
                },
                language: {
                    fieldType: "SelectList",
                    fieldName: "language",
                    label: this.$t("Preffered language"),
                    vvalidate: "required",
                    horizontal:"true",
                    id: "language",
                    options: {
                        '':this.$t('Select'),
                        bengali: this.$t('বাংলা'),
                        english: this.$t('English'),
                        spanish: this.$t('español'),
                        indonesian: this.$t('Indonesia'),
                        nepali: this.$t('Nepali'),
                        singali: this.$t('Singali'),
                    },
                    //onChange: false
                }
            },
            method:'',
            user: {},
            formData:{},
            faq_id:'',
            resetData: {},
            errorMessage: [],
            show_error_message:false,
        }
    },
    mounted: function () {
        this.user = this.$store.getters['auth/userInfo'];
        var params={};
        this.method = 'add';
            this.loadData();

        if (this.data.id > 0) {
            this.faq_id = this.data.id;
            this.method = 'edit';
        }
    },
    methods: {
        loadData: function() {
            let status_option=[];
            status_option.push({
                text:this.$t('Active'),
                value:'1'
            });
            status_option.push({
                text:this.$t('Inactive'),
                value:'0'
            });
            this.schema["status"]["options"] = status_option;
            this.$set(this.formData,"status",1);
            this.$set(this.formData,"language","");
            if(this.data.id){
                this.method = "edit";
                this.$set(this.formData,"header",this.data.header);
                this.$set(this.formData,"answer",this.data.answer);
                this.$set(this.formData,"status",this.data.status);
                this.$set(this.formData,"language",this.data.language);
                this.resetData = this.data;
            }
        },

        handleSubmit: function () {
            this.$validator.validate().then(valid => {
                if (valid) {
                    let params = {};
                        params["header"]=this.formData.header;
                        params["answer"]=this.formData.answer;
                        params["status"]=this.formData.status;
                        params["language"]=this.formData.language;
                        //this.loading_show = true;
                    let api_url = "/common-service/api/v1/faqs/";

            if(this.data.id) {
                api_url = "/common-service/api/v1/faqs/" + this.data.id;
                this.$http_service.put(api_url, JSON.stringify(params))
                    .then(response => {
                        console.log("Success");
                        //console.log(response.data);
                         this.$emit('close',true);
                         this.$toast.success({message: "Successfully Edited"});
                         this.$emit('close', 1);
                    })
                    .catch(error => {
                        for(let key in err.response.data.errors){
                            let message = JSON.parse(err.response.data.errors[key]);
                            this.errorMessage[message.field] = message.error;
                        }
                    })
            }else{
                this.$http_service.post(api_url, JSON.stringify(params))
                    .then(response => {
                    console.log('responsedata',response.data)
                            this.$emit('close',true);
                            this.$toast.success({message: "Successfully Added"});
                            this.$emit('close',1);
                    }).catch(error => {
                    for(let key in err.response.data.errors){
                        let message = JSON.parse(err.response.data.errors[key]);
                        this.errorMessage[message.field] = message.error;
                        //console.log(this.errorMessage)
                    }
                })
            }
                } else {
                }
            });

        },
        handleReset: function () {
            this.errorMessage = [];

            this.errors.clear();
            this.formData={};
        },
        handleCancel: function () {
            this.$emit('close');
        }
    }
}



