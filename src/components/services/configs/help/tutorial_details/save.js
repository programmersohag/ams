import FormGenerator from "@/containers/form_generators/FormGenerator";
import CustomModal from '@/containers/Modal';
import FormError from "@/containers/FormError";

export default {
  name: 'VideoTutorial',
  props:{
    id: String
  },

  components: {
    CustomModal,
    FormError,
    FormGenerator
  },
  data() {
    return {
      schema: {
        cbo_header: {
          fieldType: "TextAreaInput",
          fieldName: "cbo_header",
          label: this.$t("question"),
          vvalidate: "required",
          id: "cbo_header"
        },
        cbo_link: {
          fieldType: "TextAreaInput",
          fieldName: "cbo_link",
          label: this.$t("link"),
          vvalidate: "required",
          id: "cbo_link"
        },
        cbo_description: {
          fieldType: "TextAreaInput",
          fieldName: "cbo_description",
          label: this.$t("description"),
          vvalidate: "required",
          id: "cbo_description",
        },
        cbo_status: {
          fieldType: "SelectList",
          fieldName: "cbo_status",
          label: this.$t("status"),
          vvalidate: "required",
          horizontal: "true",
          id: "cbo_status",
          options: {
              '':this.$t('select'),
              1: this.$t('Active'),
            0: this.$t('Inactive'),


          },
          isShow: true
        },

        },

      method:'',
      user: {},
      response:'',
      formData:{},
      resetData: {},
      tutorial_id:'',
      errorMessage: [],
    }
  },

  mounted: function () {
    this.user = this.$store.getters['auth/userInfo'];
    let params;
    this.method = 'add';
    this.loadData();

    if (this.id > 0) {
      this.tutorial_id=this.id;
      this.method = 'edit';
    }

  },
  methods: {
    loadData: function() {
      this.resetData=[];
      const formData = {};
      this.$set(formData, "cbo_header", "");
      this.$set(formData, "cbo_link", "");
      this.$set(formData, "cbo_description", "");
      this.$set(formData, "cbo_status", "");
      if(this.id) {
        this.$http_service.get("/common-service/api/v1/tutorials/"+this.id)
          .then(response => {
            this.response=response.data;
            this.$set(formData,"cbo_header",this.response.header);
            this.$set(formData,"cbo_link",this.response.link);
            this.$set(formData,"cbo_description",this.response.description);
            this.$set(formData,"cbo_status",this.response.status);
          });
        this.formData = formData;
        this.resetData = Object.assign({}, formData);
          }

      },
    handleSubmit: function () {
      this.$validator.validate().then(valid => {
        if (valid) {
          let url = "/common-service/api/v1/tutorials/";
          let params = {};
          params["header"]=this.formData.cbo_header;
          params["link"]=this.formData.cbo_link;
          params["description"]=this.formData.cbo_description;
          params["status"]=this.formData.cbo_status;

          if(this.id) {
            url = "/common-service/api/v1/tutorials/" + this.id;
            this.$http_service.put(url, JSON.stringify(params))
              .then(response => {
                this.$toast.success({message: "Successfully Edited the Question"});
                this.$emit('close', 1);
              })
              .catch(error => {
                for(let key in err.response.data.errors){
                  let message = JSON.parse(err.response.data.errors[key]);
                  this.errorMessage[message.field] = message.error;
                }
              })
          }else{
            this.$http_service.post(url, JSON.stringify(params))
              .then(response => {
                this.$toast.success({message: "Successfully Added the Question"});
                this.$emit('close',1);
              }).catch(error => {
              for(let key in err.response.data.errors){
                let message = JSON.parse(err.response.data.errors[key]);
                this.errorMessage[message.field] = message.error;
              }
            })
          }
        }
      });

    },
    handleReset: function () {
      this.errorMessage = [];
      this.errors.clear();
      if (this.id) {
        this.formData = Object.assign(this.formData, this.resetData);
      } else {
        this.formData = {};
      }
    },
    handleCancel: function () {
      this.$emit('close');
    }
  }
}


