import Vue from 'vue';
import Swal from 'sweetalert2';
import router from "../../router";

Vue.mixin({
  methods: {
    confirmMessageService: function (id = 0, itemInfo, load = false) {
      let itemInfoData = itemInfo[0];
      let url = itemInfoData.url + id;
      let field_id = itemInfoData.field_id;
      let html = (itemInfoData.html) ? itemInfoData.html : "";
      let title = (itemInfoData.title) ? itemInfoData.title : "Are you sure?";
      if (!id) {
        Swal('ID is not provided');
      }
      Swal({
        title: title,
        html: html,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.value) {
          this.$http_service
            .delete(url)
            .then(res => {
              let status = 'success';
              let status_name = 'Deleted!';
              let message = res.data.message;
              if (res.data.status == 'link') {
                status = 'warning';
                status_name = 'Warning!';
                this.$route.push(res.data.message);
              }
              if (res.data.code == 200) {
                if (load == true) {
                  this.$emit("delete");
                } else {
                  this.loadData();
                }
              } else if (res.data.status == 'warning') {
                status = 'warning';
                status_name = 'Warning!';
              } else {
                status = 'error';
                status_name = 'Error!';
              }
              Swal(status_name, message, status)
            })
        }
      })
    },
    confirmMessage: function (id = 0, itemInfo, load = false, timeout = 55000) {
      let itemInfoData = itemInfo[0];
      let url = itemInfoData.url + '/' + id;
      let extra_params = itemInfoData.extra_params;
      if (extra_params) {
        for (let key in extra_params) {
          url += '/' + extra_params[key];
        }
      }
      let field_id = itemInfoData.field_id;
      let html = (itemInfoData.html) ? itemInfoData.html : "";
      let title = (itemInfoData.title) ? itemInfoData.title : "Are you sure?";
      if (!id) {
        Swal('ID is not provided');
      }
      Swal.fire({
        title: title,
        html: html,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        showLoaderOnConfirm: true,
        preConfirm: (result) => {
          if (result) {
            let params = new FormData();
            params.append(field_id, id);
            return this.$axios
              .post(url, params, {timeout: timeout})
              .then(res => {
                if(res.data.statusCode == 200){
                  this.flashMessage("SUCCESS",res.data.message);
                }else if(res.data.statusCode == 202){
                  this.$toast.error({title:'Not Delete',message:res.data.message});
                  return;
                }
                res.data.status = 'success';
                res.load = load;

                return res.data;
              }).catch(error => {
                Swal.showValidationMessage(
                  `Request failed: ${error}`
                )
              })
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.value) {
          let data = result.value;
          let status = 'success';
          let status_name = 'Deleted!';
          let message = data.message;
          if (data.status == 'link') {
            status = 'warning';
            status_name = 'Warning!';
            router.push(data.message);
          }
          if (data.software_date_ais != undefined && data.software_date_ais) {
            this.$store.dispatch('auth/updateSoftwareDate', data.software_date_ais);
          }
          if (data.software_date != undefined && data.software_date) {
            this.$store.dispatch('auth/updateSoftwareDate', data.software_date);
          }
          if (data.status == 'success') {
            if (load == true) {
              this.$emit("delete");
            } else {
              this.loadData();
            }
          } else if (data.status == 'warning') {
            status = 'warning';
            status_name = 'Warning!';
          } else {
            status = 'error';
            status_name = 'Error!';
          }
          // Swal(status_name, message, status)
        }
      })
    },
    confirmationMessage: function (param, load = false, timeout = 55000) {
      const url = param.url
      const deleteParam = param['schedule_id'];
      let html = (param.html) ? param.html : "";
      let title = (param.title) ? param.title : "Are you sure?";
      if (!deleteParam) {
        Swal('ID is not provided');
      }
      Swal.fire({
        title: title,
        html: html,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        showLoaderOnConfirm: true,
        preConfirm: (result) => {
          if (result) {
            return this.$axios
              .post(url, null, {params: {id: deleteParam}, timeout: timeout})
              .then(res => {
                if (res.data.statusCode !== 200) {
                  throw new Error(res.data.message)
                } else {
                  res.data.status = 'success';
                }
                res.load = load;

                return res.data;
              }).catch(error => {
                Swal.showValidationMessage(
                  `Request failed: ${error}`
                )
              })
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.value) {
          let data = result.value;
          let status = 'success';
          let status_name = 'Deleted!';
          let message = data.message;
          if (data.status === 'link') {
            status = 'warning';
            status_name = 'Warning!';
            router.push(data.message);
          }
          if (data.software_date_ais !== undefined && data.software_date_ais) {
            this.$store.dispatch('auth/updateSoftwareDate', data.software_date_ais);
          }
          if (data.software_date !== undefined && data.software_date) {
            this.$store.dispatch('auth/updateSoftwareDate', data.software_date);
          }
          if (data.status === 'success') {
            if (load === true) {
              this.$emit("delete");
            } else {
              this.loadData();
            }
          } else if (data.status === 'warning') {
            status = 'warning';
            status_name = 'Warning!';
          } else {
            status = 'error';
            status_name = 'Error!';
          }
          Swal(status_name, message, status)
        }
      })
    }
  }
});
