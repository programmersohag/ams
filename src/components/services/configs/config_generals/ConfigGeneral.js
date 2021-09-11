import FormGenerator from "@/containers/form_generators/FormGenerator";
import API from "@/shared/common/API.js"

var configGeneralAPI = new API();
configGeneralAPI.createEntity({name: "config_generals"});
export default {
  name: "ConfigGeneral",
  components: {FormGenerator},
  props: {
    purpose_info: {},
    data: {},
    extra_param: {}
  },
  data() {
    return {
      tab_label: '',
      purpose: '',
      schema: {},
      formData: {},
      resetData: {},
      errorMessage: [],

      isLoad: false,
      docList: this.data,
      imageData: {
        docName: "",
        docFiledName: "",
        docTitle: "",
        docDescription: "",
        docTag: [],
        docFile: "",
        fileName: "",
        docInfo: {},
        isImg: true,
        flag: true,
        version: 1,
      },
    }
  },

  mounted: function () {
    let tab_label = this.purpose_info.label;
    let purpose = this.purpose_info.purpose;
    let purpose_info = this.purpose_info.purpose_info.entity;
    let extra_value = this.purpose_info.purpose_info.extraValue;
    const formData = {};
    const schema = [];
    let fieldType = "TextInput";
    let options = "";
    let default_value = "";


    for (let key in purpose_info) {

      let field_name = purpose_info[key].fieldName;
      let IsOnChange = false;
      this.$set(formData, field_name, purpose_info[key].defaultValue)

      if (purpose_info[key].fieldType == 'text') {
        fieldType = "TextInput";
      } else if (purpose_info[key].fieldType == 'textarea') {
        fieldType = "TextAreaInput";
      } else if (purpose_info[key].fieldType == 'number') {
        fieldType = "NumberInput";
      } else if (purpose_info[key].fieldType == 'select') {
        fieldType = "SelectList";
        options = this.formatedOptions(extra_value[purpose_info[key].dbFieldName]);
      } else if (purpose_info[key].fieldType == 'radio') {
        fieldType = "RadioList";
        options = extra_value[purpose_info[key].dbFieldName];
      } else if (purpose_info[key].fieldType == 'checkbox') {
        fieldType = "CheckBoxList";
        options = extra_value[purpose_info[key].dbFieldName];
      } else if (purpose_info[key].fieldType == 'date') {
        var txt_date = this.$moment(purpose_info[key].defaultValue).format("YYYY-MM-DD");
        this.$set(formData, field_name, txt_date)
        fieldType = "DateInput";
      } else if (purpose_info[key].fieldType == 'file') {
        fieldType = "ImageInput";
        IsOnChange = true;
        if (purpose_info[key]['dbFieldName'] == "po_logo") {
          if (purpose_info[key]['defaultValue']) {
            default_value = "data:image/png;base64," + purpose_info[key]['defaultValue'];
          }
          this.$set(formData, field_name, default_value)
        }
      } else if (purpose_info[key].fieldType == 'password') {
        fieldType = "PasswordInput";
      }
      if (field_name == "cbo_is_skt_required") {
        IsOnChange = true;
      }
      if (field_name == "cbo_savings_balance_used_for_interest_calculation") {
        IsOnChange = true;
      }
      if (field_name == "cbo_auto_amount_type") {
        IsOnChange = true;
      }
      if (field_name == "cbo_purpose_option") {
        IsOnChange = true;
      }

      let IsDisabled = false;
      if (field_name == "txt_skt_amount" && formData['cbo_is_skt_required'] == false) {
        IsDisabled = true;
      }
      if (field_name == "txt_savings_minimum_balance_required_for_interest_calculation" && formData['cbo_savings_balance_used_for_interest_calculation'] != "MINIMUM_BALANCE") {
        IsDisabled = true;
      }
      if (field_name == "cbo_show_advance_field" && formData['cbo_auto_amount_type'] == false) {
        IsDisabled = true;
      }
      if (field_name == "cbo_collection_sheet_options" && formData['cbo_purpose_option'] == false) {
        IsDisabled = true;
      }

      schema.push({
        fieldType: fieldType,
        placeholder: "",
        label: purpose_info[key].labelName,
        fieldName: purpose_info[key].fieldName,
        options: options,
        multi: false,
        vvalidate: purpose_info[key].validateRules,
        onChange: IsOnChange,
        isDisabled: IsDisabled,
        default: default_value,
        formClass: "col-md-4"
      });
    }

    this.id = this.$route.params["id"];

    if (this.extra_param && this.extra_param['employeeId']) {
      this.employeeId = this.extra_param['employeeId']
    }
    let fieldName = "";
    if (this.extra_param && this.extra_param['fieldName']) {
      fieldName = this.extra_param['fieldName']
    }
    if (this.id) {
      if (this.docList[fieldName]) {
        let docList = this.docList[fieldName];
        if (docList['isOthers']) {
          this.isOthers = true;
        }
        if (docList['docInfo'] && docList['docInfo']['type']) {
          let type = docList['docInfo']['type'];
          let arr = type.split("/");
          if (arr[1] == 'pdf') {
            this.imageData["isImg"] = false
          }
        }
        this.imageData['docName'] = docList['docName'];
        this.imageData['docFiledName'] = docList['fieldName'];
        this.imageData['docTitle'] = docList['docTitle'];
        this.imageData['docDescription'] = docList['description'];
        this.imageData['docTag'] = this.getTagStrToArr(JSON.parse(docList['tags']));
        this.imageData['fileName'] = docList['fileName'];
        this.imageData['docInfo'] = docList['docInfo'];
        this.imageData['version'] = docList['version'];
        this.getDocInfo(docList['docInfo'], docList['projectPath']);
      }
    } else {
      this.isDocLoad = true;
    }
    this.isLoad = true;

    this.tab_label = tab_label
    this.purpose = purpose
    this.formData = formData
    this.resetData = Object.assign({}, formData);
    this.schema = schema
  },

  methods: {
    handleSubmit: function () {
      this.$validator.validate().then(valid => {
        if (valid) {
          const form_data = {};
          form_data['purpose'] = this.purpose;
          for (let key in this.formData) {
            if (key == 'txt_po_logo') {
              form_data[key] = this.formData[key][1];
            } else {
              form_data[key] = this.formData[key];
            }

          }
          let params = JSON.stringify(form_data);
          const headers = {
            headers: {
              'Content-Type': 'application/json'
            }
          };

          this.$axios.post('config-generals/update', params, headers
          ).then(res => {
            if (res.data.statusCode == '200') {
              this.$store.dispatch('config/getGeneralConfig');
              this.flashMessage('success', res.data.message);
              // this.handleDocUpload();
            } else if (res.data.error) {
              this.errorMessage = res.data.error;
            }

          }).catch(function (error) {
            console.log(error);
          });
        }
      });
    },

    handleReset: function (e) {
      this.errorMessage = [];
      this.errors.clear();
      this.formData = Object.assign(this.formData, this.resetData);
    },
    handleCancel: function () {
      this.$emit('ActiveTab', 'active');
    },


    onChangeMethod(field, value) {
      if (field == "txt_po_logo") {
        console.log("value", value);
        this.imgValidation = false;
        this.isFileChange = true;
        this.imageData.docFile = files[1];
        this.imageData.docInfo = this.getFile(files[0]);
        this.handleDocUpload();
        //value.replace(/^data:image\/[a-z]+;base64,/, "");
        //this.$set(this.formData,"txt_po_logo", value.replace(/^data:image\/[a-z]+;base64,/, ""));
      }

      if (field == "cbo_is_skt_required") {
        if (value == false) {
          this.schema[this.schema.findIndex(el => el.fieldName === 'txt_skt_amount')]["isDisabled"] = true;
        } else {
          this.schema[this.schema.findIndex(el => el.fieldName === 'txt_skt_amount')]["isDisabled"] = false;
        }
      }

      if (field == "cbo_savings_balance_used_for_interest_calculation") {
        if (value != "MINIMUM_BALANCE") {
          this.schema[this.schema.findIndex(el => el.fieldName === 'txt_savings_minimum_balance_required_for_interest_calculation')]["isDisabled"] = true;
        } else {
          this.schema[this.schema.findIndex(el => el.fieldName === 'txt_savings_minimum_balance_required_for_interest_calculation')]["isDisabled"] = false;
        }
      }

      if (field == "cbo_auto_amount_type") {
        if (value == false) {
          this.schema[this.schema.findIndex(el => el.fieldName === 'cbo_show_advance_field')]["isDisabled"] = true;
        } else {
          this.schema[this.schema.findIndex(el => el.fieldName === 'cbo_show_advance_field')]["isDisabled"] = false;
        }
      }

      if (field == "cbo_purpose_option") {
        if (value == false) {
          this.schema[this.schema.findIndex(el => el.fieldName === 'cbo_collection_sheet_options')]["isDisabled"] = true;
        } else {
          this.schema[this.schema.findIndex(el => el.fieldName === 'cbo_collection_sheet_options')]["isDisabled"] = false;
        }
      }
    },
    getDocInfo: function (docInfo, projectPath) {
      let userInfo = this.$store.getters['auth/userInfo'];
      let mfiName = "demonext";
      let dowFileInfo = {
        "file": this.imageData['fileName'],
        "folder": this.imageData['docFiledName'],
        "project": projectPath,
        "drive": "mfin-" + mfiName
      };

      if (this.imageData['fileName']) {
        imageLoad(dowFileInfo).then((value) => {
          if (value) {
            this.imageData.docFile = value;
            this.docEditFile = value;
          }
          this.isDocLoad = true;
        })
      }
    },

    getFile: function (fileObject) {
      let newObject = {
        'lastModified': fileObject.lastModified,
        'lastModifiedDate': fileObject.lastModifiedDate,
        'name': fileObject.name,
        'size': fileObject.size,
        'type': fileObject.type
      };
      return newObject;
    },

    getDocCate: function () {
      let cateId = '5d9da1cf5e37c5114c717625';
      if (this.imageData['docFiledName'] == 'member_picture') {
        cateId = '5d9da1cf5e37c5114c717625';
      } else if (this.imageData['docFiledName'] == 'employee_signature') {
        cateId = '5d9da10d5e37c5114c717623';
      }
      return cateId;
    },
    handleDocUpload: function () {
      //alert(6);
      //console.log("Enter Into handleDocUpload")
      let userInfo = this.$store.getters['auth/userInfo'];
      let branchId = userInfo['branch_id'];
      let employeeCode = '111';
      console.log("employeeCode", employeeCode);
      let nationalId = '';
      let mobileNo = "";
      let isEmployeeId = "";
      console.log("-----This ID----", this.id);
      console.log("-----Display isEmployeId-----", isEmployeeId);
      // this.id = this.$route.params["id"];
      // this.isEmployeeId = this.$route.params["id"] > 0 ? this.$route.params["id"] : "" ;
      // let id = "";
      // let mfiName = userInfo['mfi_name'];
      let mfiName = "demonext";
      let cateId = this.getDocCate();
      let flags = this.imageData["isImg"];
      console.log("Flags--------", flags);
      let folderPath = "member_picture"; // employee_picture, employee_signature
      let projectPath = "branch-" + branchId;
      let description = "This is employee picture";
      let tags = ["Member", "picture"];
      let version = 1;
      let docFileName = "";
      let doctitle = "Test Case 6";
      let is_others = 0;
      let references = {
        "EmployeeCode": employeeCode,
        "NationalId": nationalId,
        "PhoneNo": mobileNo,
        "UploadBy": userInfo['name']
      }
      if (this.id) {
        docFileName = docFileName;
        version = version + 1;
      } else {
        let extension = this.$refs.docRef['imgExtension'];

        docFileName = mfiName + '_' + folderPath + '_' + branchId + '_' + employeeCode + "." + extension;

      }

      let fileInfo = {
        "fileName": docFileName,
        "folderPath": "/" + folderPath,//employee_picture
        "drivePath": "mfin-" + mfiName, // mfi name
        "projectPath": projectPath,//branch-1
        "author": "MFI",
        "description": description,
        "categories": [cateId],
        "tags": tags,
        "references": references,
        "version": version,
      }
      let params1 = {
        "file": this.imageData['docFile'],
        "fileName": docFileName,
        "file_info": JSON.stringify(fileInfo)
      }

      console.log("=====params", params1);

      const param = new FormData();
      param.append('doc_title', doctitle);
      param.append('id', isEmployeeId);
      param.append('doc_file_name', docFileName);
      param.append('field_name', folderPath);
      param.append('member_id', employeeCode);
      param.append('project_path', projectPath);
      param.append('folder_path', folderPath);
      param.append('doc_description', description);
      param.append('is_others', is_others);
      param.append('doc_tag', JSON.stringify(tags));
      param.append('doc_info', JSON.stringify(this.imageData['docInfo']));
      if (this.id && !this.isFileChange) {
        param.append('version', version);
      } else {
        param.append('version', version);
      }

      if (this.id && !this.isFileChange) {
        this.$axios.post('/members/ajax_document_upload', param)
          .then(resp1 => {
            this.flashMessage(resp1.data.status, resp1.data.message);
            if (resp1 && resp1.status == 200) {
              // this.handleSignatureUpload();
              this.$emit('close', true);
            }
          })
        return false;
      }

      this.$http_service.post("/filemanager-service/uploads/", JSON.stringify(params1)).then(resp => {
        if (resp.status == 200) {
          this.$axios.post('/members/ajax_document_upload', param)
            .then(resp1 => {
              this.flashMessage(resp1.data.status, resp1.data.message);

              if (resp1 && resp1.status == 200) {
                // this.handleSignatureUpload();
                this.$emit('close', true);

              }
            })
        }
      });
    },
    formatedOptions: function (options) {
      let common_data = [];
      for (let key in options) {
        common_data.push({
          text: options[key],
          value: key
        })
      }
      return common_data
    }

  }
};
