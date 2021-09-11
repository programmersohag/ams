
/* Selected Options*/
export const selectedOptions = (data, select = '', isSelect = true) => {
    let text_name = "--Select--";
    if(select == "-1"){
        text_name = "--All--";
    }
    if(select == "all"){
        text_name = "All";
        select = '';
    }
    if(isSelect) {
        data.push({
            text :text_name,
            value :select,
        });
    }
}

/* Area, Zone and Region */
export const ReportTypeGeneratByReportLevel=(options,select) => {

    var  optionns_formatted=[];
    let selectedData=selectedOptions(optionns_formatted,select);

    for (let index in options) {
        optionns_formatted.push({
            text :options[index]['name'],
            value :index,
            disabled:false
        })
        for (let index2 in options[index]['child']) {

            optionns_formatted.push({
                text: options[index]['child'][index2],
                value: index+"@@@##"+index2,
                disabled: true
            });
        }
    }
    return optionns_formatted;
}

/*      Branch options list    */
export const getBranchOptions = (data,select,isCode=1) => {
    let branch_data = [];
    let selectedData = selectedOptions(branch_data, select);

    if (data && Object.keys(data).length > 0 || data && data.length > 0) {
        for (let key in data) {
            if(isCode==0) {
                    branch_data.push({
                        text:data[key]['branch_name'],
                        value: data[key]['branch_id']
                    })
                }
                else {
                    branch_data.push({
                        text: data[key]['branch_code'] + "-" + data[key]['branch_name'],
                        value: data[key]['branch_id']
                    })
                }
        }
    }
    return branch_data;

}

/*      Field officer list    */
export const getfieldOfficer = (data, officer, select) => {

    let field_officer=[];
    let selectedData=selectedOptions(field_officer,select);
    if (data && Object.keys(data).length > 0 || data && data.length > 0) {

        for (let i = 0; i < officer; i++) {
                field_officer.push({
                    text: data['name'][i],
                    value: data['id'][i]
                })
        }
    }
    return field_officer;
}

export const getFormatForNameAndId = (data_id,data_name, select='') => {

    let nameId_data=[];
    let selectedData=selectedOptions(nameId_data,select);
    if (data_id.length>0 ||  Object.keys(data_id).length > 0) {
        for (let key in data_id) {
            if(data_id[key]!='-1'&& data_id[key]!='')
                nameId_data.push({
                    text: data_name[key],
                    value: data_id[key]
                })

        }
    }
    return nameId_data;

}

/*      New Field officer list    */
export const getNewFieldOfficer = (data, select,isCode=1) => {

    let newfield_officer=[];
    let selectedData=selectedOptions(newfield_officer,select);
    if (data && Object.keys(data).length > 0 || data && data.length > 0) {

        for (let key in data) {
            if(isCode==0) {
                newfield_officer.push({
                    text: data[key]['field_officer_name'],
                    value: data[key]['field_officer_id']
                })
            }
            else{
                newfield_officer.push({
                    text: data[key]['field_officer_code']+"-"+ data[key]['field_officer_name'],
                    value: data[key]['field_officer_id']
                })
            }
        }
    }
    return newfield_officer;
}

/*     Employee list    */
export const getEmployeeOptions = (data, select) => {

    let employee_data=[];
    let selectedData=selectedOptions(employee_data,select,);

    if(data && Object.keys(data).length > 0 || data && data.length>0 )
    {
        for (let key in data) {

                employee_data.push({
                    text:data[key]['code']+ "-" +data[key]['name'],
                    value:data[key]['id']
                })
        }
    }
    return employee_data;
}
 /*  New Employee List    */
export const getNewEmployeeOptions = (data,key,select) => {

    let newemployee_data=[];
    let selectedData=selectedOptions(newemployee_data,select,);

    if(data && Object.keys(data).length > 0 || data && data.length>0 )
    {
        for (let i=1;i<key;i++) {

            newemployee_data.push({
                text:data['employee_name'][i],
                value:data['employee_id'][i]
            })
        }
    }
    return newemployee_data;
}

/* Designation List*/

export const getDesignationOptions = (data, select) => {

    let designation_data=[];
    let selectedData=selectedOptions(designation_data,select);
    if(data && Object.keys(data).length > 0 || data && data.length>0)
    {
        for (let key in data) {
            designation_data.push({
                    text:data[key]['designation_name'],
                    value:data[key]['designation_id']
                })
        }
    }
    return designation_data;

}

/*      Samity list    */
export const getSamityOptions = (data, samity,select) => {

    let samity_data=[];
    let selectedData=selectedOptions(samity_data,select);
    if (data && Object.keys(data).length > 0 || data && data.length > 0) {
        for (let i = 1; i < samity; i++) {
            samity_data.push({
                text: data['samity_name'][i],
                value: data['samity_id'][i]
            })
        }
    }
    return samity_data;
}
/*      ProductCategory  list    */
export const getProductCategoryOptions = (data, select,isCode=0) => {

    let product_category=[];
    let selectedData=selectedOptions(product_category,select);
    if (data && Object.keys(data).length > 0 || data && data.length > 0) {
        for (let key in data) {
            if(isCode==1) {
                product_category.push({
                    text: data[key]['code']+'-' + data[key]['short_name'],
                    value: data[key]['id']
                })
            }
            else{
                product_category.push({
                    text: data[key]['name'],
                    value: data[key]['id']
                })
            }
        }
    }
    return product_category;
}

/*      DailyBasisProductCategory  list    */
export const getDailyBasisProductCategoryOptions = (data, select,isCode=0) => {

    let product_category=[];
    let selectedData=selectedOptions(product_category,select);
    if (data && Object.keys(data).length > 0 || data && data.length > 0) {
        for (let key in data) {
            if(isCode==1) {
                product_category.push({
                    text:  data[key]['short_name'],
                    value: data[key]['id']
                })
            }
            else{
                product_category.push({
                    text: data[key]['short_name'],
                    value: data[key]['id']
                })
            }
        }
    }
    return product_category;
}
/*      ProductCategorywithCode  list    */
export const getCategoryWiseProductInfoOptions = (data_id,data_code,data_name, select='') => {

    let product_data=[];
    let selectedData=selectedOptions(product_data,select);
    if (data_id && Object.keys(data_id).length > 0 || data_id && data_id.length > 0) {
        for (let i = 0; i < data_id.length; i++) {
            product_data.push({
                text: data_code[i] + ' ' + data_name[i],
                value: data_id[i]
            })
        }
    }
    return product_data;

}
/*      Product list    */
export const getProductOptions = (data, product, select) => {

    let product_data=[];
    let selectedData=selectedOptions(product_data,select);
    if (data && Object.keys(data).length > 0 || data && data.length > 0) {
        for (let i = 0; i < product; i++) {

            product_data.push({
                text: data['product_code'][i] + '-' + data['product_name'][i],
                value: data['product_id'][i]
            })
        }
    }
    return product_data;

}
/* Product with Funding organization */
export const getProductFundOptions = (data, select,isCode=0) => {

    let product_fundingOrg=[];
    let selectedData=selectedOptions(product_fundingOrg,select);
    if (data && Object.keys(data).length > 0 || data && data.length > 0) {
        for(let key in data) {
            if(isCode==1)
            {
                product_fundingOrg.push({
                    text:data[key]['product_mnemonic']+ '-' + data[key]['funding_org_name'],
                    value: data[key]['product_id']
                })
            }
            else {
                product_fundingOrg.push({
                    text:data[key]['short_name'],
                    value: data[key]['id']
                })
            }
        }
    }
    return product_fundingOrg;
}


/*      Department list    */
export const getDepartmentOption = (data, select) => {

    let dept_data=[];
    let selectedData=selectedOptions(dept_data,select);
    if (data && Object.keys(data).length > 0 || data && data.length > 0) {
        for (let key in data) {
            dept_data.push({
                text: data[key]['department_name'],
                value: data[key]['department_id']
            })
        }
    }
    return dept_data;

}
/* Year and Month options*/
export const getYearOptions = (data, select) => {

    let year_data=[];
    let selectedData=selectedOptions(year_data,select);
    if(data && data.length>0 || data && Object.keys(data).length > 0) {
        for (let key in data) {
            if(data[key]!='-1'&& data[key]!='' && key!='')
                year_data.push({
                    text: data[key],
                    value: data[key]
                })
        }
    }
    return year_data;

}

/* Common options*/
export const getCommonOptions = (data, select) => {

    let common_data=[];
    if (select !== null) {
      let selectedData=selectedOptions(common_data,select);
    }
   if(data && data.length>0 || data && Object.keys(data).length > 0)
   {
       for (let key in data) {
           if(key!='-1'&& key!='')
           common_data.push({
                   text: data[key],
                   value: key
               })
       }
   }
   return common_data;
}
export const getNewCommonOptions = (data, select = '',isCode=0) => {

    let commonnew_data = [];
    if(select !== 'noSelectedData') {
        let selectedData = selectedOptions(commonnew_data, select);
    }
    if (data && data.length > 0 || data && Object.keys(data).length > 0) {
        for (let key in data) {
        if(isCode==1)
        {
            commonnew_data.push({
                text:data[key]['code']+ '-' +data[key]['name'],
                value:data[key]['id']
            })
        }
        else{
            commonnew_data.push({
                text:data[key]['name'],
                value:data[key]['id']
            })
        }
        }
    }
    return commonnew_data;
}

/***
 * @auther  : Limon
 * @created : 4 January 2020
 * @params  : array of object, order by and boolean is code required
 * data must contain id and name keys optional requirements is code
 * @return  : sorted option array.
 */
export const getSortedOptions = (data, order_by = 'id', code_required = false) => {

    let result_option = [];
    result_option.push({
        text: "---Select---",
        value:''
    });
    let formated_data = [];
    for(const key in data){
        formated_data.push(data[key])
    }

    if (data && data.length > 0 || data && Object.keys(data).length > 0) {
        formated_data.sort((a, b) => (a[order_by] > b[order_by]) ? 1 : -1);
        if(code_required){
            for (let key in formated_data) {
                result_option.push({
                    value:  formated_data[key].id,
                    text: formated_data[key].code + ' - ' + formated_data[key].name
                });
            }
        }else{
            for (let key in formated_data) {
                result_option.push({
                    value: formated_data[key].id,
                    text: formated_data[key].name
                });
            }
        }
    }
    return result_option;
}

/*      division_type  list    */
export const getDivisionOptions = (data, select,is_division=0) => {

    let division_options=[];
    let selectedData=selectedOptions(division_options,select = '');
    if (data && Object.keys(data).length > 0 || data && data.length > 0) {
        for (let key in data) {
            if(is_division==1) {
                division_options.push({
                    text: data[key]['division_name']+'-' + data[key]['division_code'],
                    value: data[key]['parent_id']
                })
            }

        }
    }
    //console.log(division_options);
    return division_options;
}

export const getGeoList = (data) => {
    let responseData = [];
    responseData.push({
        text: "---Select---",
        value: ''
    })
    for (let key in data) {
        responseData.push({
            text: data[key].name,
            value: data[key].id
        })
    }
   return responseData;
}

export const getCommonOptionsByMap = (myMap) => {
  let pushData = [];
  if(myMap.size > 0) {
    for (let [key, value] of myMap) {
      pushData.push({
        text:value,
        value:key
      })
    }
  }
  return pushData;
}






