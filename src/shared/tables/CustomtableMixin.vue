<script>
import { shuffleArray } from '@/shared/utils'
import router from '@/router/index.js'
// import  axios  from  'axios';
import SelectOption from '@/shared/report/SelectOption.vue'
import pagination from  '@/shared/tables/pagination.vue'
var  items = [];

var  tabledata = [];

var  editdata = [];

 


export default {
 name: "CustomtableMixin",
 props: {
        indexUrl: {},
        tablefields:{},
        searchParams: {},
        perPage:0,
      },    
 data(){
    return {  
      items:items,

        fielddata: {},
      currentPage: 0,
      totalRows: items.length,
      filter: null,
      modalInfo: { title: '', content: '' },
      offset:0,
      rowcount:10,
      gettotalrow:0,
     lastpage:0,
     valuenumber:1,
     pagacount:0,
     currentpage:1,
     prevpage:0,
     url:"",
   PaginationData: {
              gettotalrow:this.gettotalrow,
              pagacount:this.pagacount,
              },
    massage:"",
    alertclass:"success",
    dangerModal:false ,
      modalVisible: false,
      modalData :0,
      i:0

    }
  },
   components: {
        SelectOption: SelectOption,
        pagination:pagination,
      },

   mounted(){
    this.getrtotalrow();
    this.load(this.offset);
    this.fieldsset();
    this.searchParamsset()
  },
computed: {   
  
  },

methods: {
     countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },

// to get total row of the table

    getrtotalrow()
    {
        const params = new FormData();
        params.append('limit',0);
        params.append('offset',0);
        var sef = this;
        // console.log(params)
        this.$axios.post(sef.indexUrl.APIUrl,params)
        .then(function (response) {
          sef.gettotalrow=response.data;
                  }).catch(function (error) {
                      console.log(error);
            })

    },


    // api call
load(offset)
{
        this.url=this.indexUrl.APIUrl;
        // console.log(this.url);
      var newArray = [];
      var sef = this;
      this.items.splice(0);
        sef.offset=offset
      const params = new FormData();

        params.append('limit',this.perPage);
        params.append('offset',offset);

    this.$axios.post(sef.url,params).then(function (response) {
                console.log(response.data)
            newArray=response.data
        for(var i=0;i<newArray.length;i++){
            newArray[i]["index"]=sef.offset+i;
        items.push((newArray[i]));
        }
        for(var i=0;i<items.length;i++){
            items[i]["index"]+=1;
            // sef.offset+=1;
            }

                }).catch(function (error) {
                    console.log(error);
                });

    
  
           
},

// set table fields
fieldsset()
{
    this.fielddata=this.tablefields;
},


searchParamsset()
{
this.searchParams=this.searchParams;
},

// showing view page 
info (item, index, button) 
{
console.log(item)
      this.modalInfo.title = `Details`
      this.modalInfo.content = {
       item
      }
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
},

Delete(id,index)
{
        //   this.$emit('bv::show::modal', 'deleteconfirmation', button)
        var sef = this;
      const params = new FormData();
       params.append('id', id);
       // console.log(sef.indexUrl.DeleteURL);
    this.$axios.post(sef.indexUrl.DeleteURL,params).then(function (response) {
console.log(response.data);
    if(response.data == "Done"){

          sef.massage='Data has been deleted';
          sef.items.splice(index,1)
    }else{
    sef.alertclass="warning"
    sef.massage=response.data   
    }        
            }).catch(function (error) {
                 console.log(error.response);
             });

sef.getrtotalrow()

},
resetModal()
{
      this.modalInfo.title = ''
      this.modalInfo.content = ''
},
  
Addpage:function ()
{
      this.items.splice(0);
      //console.log(this.indexUrl.Add)
      router.push(this.indexUrl.Add);
},

edit:function (item)
{

this.items.splice(0);
this.editurl=this.indexUrl.Editpage
const params = new URLSearchParams();
  params.append('id',item.id );
   var sef = this;
    this.$axios.get(sef.indexUrl.EditURL + '/?id=' + item.id,
    ).then(function (response) {
   router.push({ name: sef.editurl, params: { editdata :response.data}})
                    // router.push('add');
    
                }).catch(function (error) {
                    console.log(error);
                });

},
onFiltered (filteredItems)
{
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = items.length
      this.currentPage = 1
},

openModal(item, index) {
      this.dangerModal = true; 
      this.modalVisible = true;
      this.modalData = item;
      this.i = index;      
    },

      checkForm(e) {

        // console.log(this.inputData);
  //  if(this.inputData.text_name!=""){
//           var sef = this;
//           this.items.splice(0);
//            const params = new URLSearchParams();
//            for ( let [k,v] of this.inputData){
// console.log(v)
//            }
  
//  params.append('Name', this.inputData.text_name);
//        console.log(items);
//    axios.post('http://localhost/microfin_v3/trunk/index.php/po_funding_organizations/search',sef.inputData,).then(function (response) {
//               // alert(this.inputData.text_name); 
// console.log(response.data[0]);
//                for(var i=0;i<response.data.length;i++){
//    response.data[i]["index"]=sef.offset+i;

//     items.push((response.data[i]));
//    tabledata.push((response.data[i]));
// }
             
//              }).catch(function (error) {
//                  console.log(error.response);
//              });

// }else{
//   this.load();
// }
//  this.offset=1,
//       this.rowcount=5,
//      this.lastpage=0,
//      this.valuenumber=1,
          
        
          // console.log()
        }



}
}

</script>