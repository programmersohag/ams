import Swal from 'sweetalert2';

export const swalConfirm = (title = '') => {
    return Swal.fire({
        title: title,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      });
  };
  export const swalAlert = (title = '', description = '', type = 'success') => {
    Swal.fire(
        title,
        description,
        type
      )
  };


  export const confirmMessage = (id = 0) => {
    let url = itemInfoData.url + '/' + id;
    let field_id = itemInfoData.field_id;
    let html = (itemInfoData.html) ? itemInfoData.html : "";
    let title = (itemInfoData.title) ? itemInfoData.title: "Are you sure?";
    if(!id) {
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
            if(result) {
                let params = new FormData();
            params.append(field_id, id);
            return this.$axios
            .post(url, params)
                .then(res => {
                    if (res.statusText != "OK") {
                        throw new Error(res.data.message)
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
          if(result.value) {
            let data = result.value;
            let status = 'success';
            let status_name = 'Deleted!';
            let message = data.message;
            Swal(status_name,message,status)
          }
      })
}
