import FormGenerator from "@/containers/normal_forms/FormGenerator";
import axios from 'axios';
import {swalAlert} from "@/shared/common/sweet-alert";
import ImageInput from "@/containers/form_generators/ImageInput";
import { imageLoad } from '@/shared/utils';
import {getBranchOptions,getDesignationOptions,getNewCommonOptions} from '@/shared/options/generate.js';

export default {
    components: {
        FormGenerator,ImageInput
    },
    props: {
        data: {},
        extra_param: {}
    },

    data() {
        return {
            max: 6,
            text: '',
            isLoad: false,
            docList: this.data,
            selectedFieldName: "",
            selectedDocList: {},
            docEditFile:"",
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
                flag:true,
                version:1,
            },
            resetModalData: {},
            employeeId: 0,
            isEmployeeId:"",
            isDocLoad: false,
            imgValidation: false,
            isFileChange: false,
            resetData:{},
            id:0,
            user:this.$store.getters['auth/userInfo'],
            load: false,
            method:"add",
            general_configurations: []
        };



    },

    mounted: function () {

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

    },
    methods: {

      // Image Upload
        handleRemoveDoc: function () {
            this.imageData['docFile'] = "";
            this.imageData['docInfo'] = {};
            this.imgValidation = false;
        },
        getDocInfo: function (docInfo, projectPath) {
            let userInfo = this.$store.getters['auth/userInfo'];
            let mfiName = "demonext";
            let dowFileInfo = {
                "file": this.imageData['fileName'],
                "folder":this.imageData['docFiledName'],
                "project": projectPath,
                "drive": "mfin-"+mfiName
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
        getDocCate: function() {
            let cateId = '5d9da1cf5e37c5114c717625';
            if(this.imageData['docFiledName'] == 'member_picture') {
                cateId = '5d9da1cf5e37c5114c717625';
            } else if(this.imageData['docFiledName'] == 'member_signature') {
                cateId = '5d9da10d5e37c5114c717623';
            }
            return cateId;
        },


        onChangeDoc: function (files) {
            //alert("onChangeDoc")
            if (files[1] && files[0]) {
                this.imgValidation = false;
                this.isFileChange = true;
                this.imageData.docFile = files[1];
                this.imageData.docInfo = this.getFile(files[0]);
            };
        },

        handleDocUpload: function(){
            console.log("Enter Into handleDocUpload")
            let userInfo = this.$store.getters['auth/userInfo'];
                    let branchId = userInfo['branch_id'];
                    let employeeCode = "186";
                    let nationalId = "";
                    let mobileNo = "";
                    let isEmployeeId = this.id > 0 ? this.id : "" ;
                    console.log("-----This ID----",this.id);
                    console.log("-----Display isEmployeId-----",isEmployeeId);
                    // let mfiName = userInfo['mfi_name'];
                    let mfiName = "demonext";
                    let cateId = this.getDocCate();
                    let flags = this.imageData["isImg"];
                    console.log("Flags--------",flags);
                    let folderPath = "member_picture"; // employee_picture, employee_signature
                    let projectPath = "branch-" + branchId;
                    let description = "This is Logo";
                    let tags = ["Logo","picture"];
                    let version = 1;
                    let docFileName = "";
                    let doctitle = "Logo";
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
                        "drivePath":"mfin-"+mfiName, // mfi name
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

                    console.log("=====", params1);

                    const param = new FormData();
                    param.append('doc_title',doctitle);
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
                                        this.$emit('close', true);

                                    }
                                })
                        }
                    });
        },

        //end  here
        handleReset: function() {
            this.errorMessage = [];
            if(this.id > 0) {
                this.formData = Object.assign(this.formData, this.resetData);
            } else {
                this.formData={
                    cbo_gender:"M",
                    cbo_is_field_officer:"",
                    cbo_blood_group:"0",
                    cbo_status:1
                };
            }
            this.errors.clear();
        },
        handleCancel: function() {
            this.$router.push("/admin/logo/Index.js");
        }
    }
};
