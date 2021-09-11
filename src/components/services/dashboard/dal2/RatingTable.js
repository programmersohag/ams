import Pagination from '@/containers/Pagination';
import CommonIndex from '@/containers/CommonIndex';
import SearchFormGenerator from "@/containers/search_forms/FormGenerator";
import {getBranchOptions} from '@/shared/options/generate.js';
import Swal from 'sweetalert2';
export default {
    name: 'branchValue',
    components: {
      CommonIndex,
      SearchFormGenerator,
      Pagination
  },
    data () {
      return {
          tableList:[],
          isLoad:false,
          pagination: {
            offset: 0,
            total_rows: 0,
            row_per_page: 25
          },
          headerMemberInfo:[
            {key: 'index', label: '#', sortable: false},
            {key: 'name', label: this.$t('Name'), sortable: true},
            {key: 'member_code', label: this.$t('Code'), sortable: true},
            {key: 'fathers_spouse_name', label: this.$t('Fathers Spouse Name'), sortable: true},
            {key: 'branch_name', label: this.$t('Branch Name'), sortable: true},
            {key: 'actions', label: this.$t('-')}
          ],
          headerLoanInfo:[
            {key: 'index', label: '#', sortable: false},
            {key: 'name', label: this.$t('Member Name'), sortable: true},
            {key: 'member_code', label: this.$t('Member Code'), sortable: true},
            {key: 'customized_loan_no', label: this.$t('Loan code'), sortable: true},
            {key: 'branch_name', label: this.$t('Branch Name'), sortable: true},
            {key: 'loan_amount', label: this.$t('Loan amount'), sortable: true},
            {key: 'actions', label: this.$t('-')}
          ],
          KpiList:{
            1:this.$t('New Member'),
            2:this.$t('Existing Member'),
            3:this.$t('Loan'),
          },
          memberSearchSchema: {
            cbo_branch: {
              fieldType: "SelectList",
              fieldName: "cbo_branch",
              options: {},
              onChange: true,
            },
            name: {
              fieldType: "TextInput",
              fieldName: "name",
              placeholder: 'By Member Name or code or Contact No'
            },
          },
          memberSearchFormData: {},
          loanSearchSchema: {
            cbo_branch: {
              fieldType: "SelectList",
              fieldName: "cbo_branch",
              options: {},
              onChange: true,
            },
            name: {
              fieldType: "TextInput",
              fieldName: "name",
              placeholder: 'By Member Name or code or Contact No or loan code'
            },
          },
          loanSearchFormData: {},
          kpi:1,
          MFI_NAME:'shiropa'
      }
    },
    mounted:function() {
        this.loadData();
    },
    methods: {
      loadData:function(){
        this.onChangeRating(this.kpi);
      },
      onChangeMethod: function(){

      },
      getLoanRating: function(offset) {
        this.pagination.offset = offset;
        let params = {
          cbo_branch:this.loanSearchFormData.cbo_branch,
          name:this.loanSearchFormData.name,
          limit: this.pagination.row_per_page,
          offset: offset
        };
        this.$axios.get('loans/ajax_index_loan_rating',  {
          params
        })
        .then(res => {
            if(res.data && res.data.member_rating && res.data.member_rating.length > 0) {
                this.tableList = res.data.member_rating;
                this.pagination.total_rows = res.data.total_rows;
                if(this.tableList.length > 0){
                  this.setTableData(res.data);
                }
            }
            this.isLoad = true;
        });
      },
      getMemberRating(offset, type) {
        this.pagination.offset = offset;
        let params = {
          cbo_branch:this.memberSearchFormData.cbo_branch,
          name:this.memberSearchFormData.name,
          type: type,
          limit: this.pagination.row_per_page,
          offset: offset
        };
        this.$axios.get('members/ajax_index_member_rating',  {
          params
        })
        .then(res => {
            if(res.data && res.data.member_rating && res.data.member_rating.length > 0) {
                this.tableList = res.data.member_rating;
                this.pagination.total_rows = res.data.total_rows;
                if(this.tableList.length > 0){
                  this.setTableData(res.data);
                }
            }
            this.isLoad = true;
        });
      },
      setTableData: function(data) {
        for(let key in this.tableList) {
          if(this.kpi == 3) {
            this.loanSearchSchema['cbo_branch']['options'] = getBranchOptions(data.branches,'');
          } else {
            this.memberSearchSchema['cbo_branch']['options'] = getBranchOptions(data.branches,'');
          }
          this.tableList[key]["branch_name"] = this.tableList[key]['branch_code']+"-"+this.tableList[key]['branch_name']
          this.tableList[key]["isCustomActionButton"] = true;
          this.tableList[key]["customActionButton"] = {
            gradeBtn: {
                name: 'Show Grade',
                name_show: true,
                variant: 'warning'
            },
          }
        }
      },
      customActionButton: function (itemData, key) {
        if(key == 'gradeBtn') {
          if(this.kpi == 1) {
            this.getNewMemberGrade(itemData);
          } else if(this.kpi == 2) {
            this.getExistingMemberGrade(itemData);
          } else if(this.kpi == 3) {
            this.getLoanGrade(itemData);
          }
        }
      },
      onChangeRating: function(kpi) {
        this.tableList = [];
        if(kpi == 1){
          this.getMemberRating(0, 1);
        } else if(kpi == 2){
          this.getMemberRating(0, 2);
        } else if(kpi == 3){
          this.getLoanRating(0);
        }
      },
      getExistingMemberGrade: function(itemData){
            Swal.fire({
                title: "Existing Member Grade",
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Show!',
                showLoaderOnConfirm: true,
                preConfirm: (result) => {
                    if(result) {
                      let user = this.$store.getters['auth/userInfo'];
                      let params = {};
                      params['MfiShortName'] = this.MFI_NAME;
                      params['MemberId'] = this.MFI_NAME+"-"+itemData['original_member_id'];
                      params['RatingDate'] = "31 May 2019";
                    return this.$http_dal_service.post('rating/existingmember', JSON.stringify(params))
                        .then(res => {
                            if (res.statusText != "OK") {
                                throw new Error(res.data.message)
                              }
                            return res.data.ExistingMember;
                        }).catch(error => {
                            Swal.showValidationMessage(
                              `Request failed: ${error}`
                            )
                          })
                    }
                },
                allowOutsideClick: () => !Swal.isLoading()
              }).then((result) => {
                  if(result.value) {
                    let data = result.value;
                    Swal.fire("Grade: "+data['Grade']);
                  }
              })
      },
      getNewMemberGrade1: function(itemData){
        // Swal({
        //   title: 'Now loading',
        //   allowEscapeKey: false,
        //   allowOutsideClick: false,
        //   timer: 2000,
        //   onOpen: () => {
        //     Swal.showLoading();
        //   }
        // }).then(
        //   () => {},
        //   (dismiss) => {
        //     if (dismiss === 'timer') {
        //       console.log('closed by timer!!!!');
        //       Swal({ 
        //         title: 'Finished!',
        //         type: 'success',
        //         timer: 2000,
        //         showConfirmButton: false
        //       })
        //     }
        //   }
        // )
      },
      getNewMemberGrade: function(itemData){
        Swal.fire({
            title: "New Member Grade",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Show!',
           // showLoaderOnConfirm: true,
           onOpen: (result) => {
                if(result) {
                  let user = this.$store.getters['auth/userInfo'];
                  let params = {};
                  params['MfiShortName'] = this.MFI_NAME;
                  params['MemberId'] = this.MFI_NAME+"-"+itemData['original_member_id'];
                  params['ISmeIndustryId'] = "1";
                  params['ThanaCode'] = itemData['thana_id'];
                  params['RatingDate'] = "31 May 2019";
                return this.$http_dal_service.post('rating/newMember', JSON.stringify(params))
                    .then(res => {
                        if (res.statusText != "OK") {
                            throw new Error(res.data.message)
                          }
                        return res.data.NewMember;
                    }).catch(error => {
                        Swal.showValidationMessage(
                          `Request failed: ${error}`
                        )
                      })
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
              if(result.value) {
                let data = result.value;
                Swal.fire("Grade: "+data['Grade']);
              }
          })
  },
  getLoanGrade: function(itemData){
    Swal.fire({
        title: "Loan Grade",
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Show!',
        showLoaderOnConfirm: true,
        preConfirm: (result) => {
            if(result) {
              let user = this.$store.getters['auth/userInfo'];
              let params = {};
              params['MfiShortName'] = this.MFI_NAME;
              params['MemberId'] = this.MFI_NAME+"-"+itemData['original_member_id'];
              params['LoanId'] = this.MFI_NAME+"-"+itemData['original_loan_id'];
            return this.$http_dal_service.post('rating/loan', JSON.stringify(params))
                .then(res => {
                    if (res.statusText != "OK") {
                        throw new Error(res.data.message)
                      }
                    return res.data.Loan;
                }).catch(error => {
                    Swal.showValidationMessage(
                      `Request failed: ${error}`
                    )
                  })
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
          if(result.value) {
            let data = result.value;
            Swal.fire("Grade: "+data['Grade']);
          }
      })
    },
    handleReset: function() {
      if(this.kpi == 3) {
        this.loanSearchFormData = {};
      } else {
        this.memberSearchFormData = {};
      }
      this.loadData();
    }
    }
  }