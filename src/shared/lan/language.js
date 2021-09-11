import StorageService from "@/shared/common/storage.service";
import { $axios } from '@/shared/common/http-axios';
// bengali,english
export async function LAN() {
    let lan_name = StorageService.getUserInfo();
    let token = await StorageService.getToken();
   //console.log("token"+ StorageService.getToken());
   //alert(StorageService.getToken())
    if (token.length == 0) {
        return '0';
    }
    //$axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    //$axios.defaults.headers.post['Content-Type'] = 'application/xhtml+xml';
    /*const response = await $axios.get('/pages/get_lang',{
        params: {
          lan: lan_name.default_language
        }
      })
    .then(response => {
        return response;
    })
    .catch(function (error) {
        console.warn(error);
    })
return response.data;*/
}

// export const getLan = ($i18n) => {
//     console.log("tttt")
//     document.querySelector('html').setAttribute('lang', 'en');
//     loadLocaleMessage('en', (err, message) => {
//         if (err) {
//          // console.error(err)
//           return
//         }
//         $i18n.setLocaleMessage('en', message)
//       })
// }

// function loadLocaleMessage (locale, cb) {
//     return LAN().then((lan) => {
//       if (Object.keys(lan).length === 0) {
//         return Promise.reject(new Error('locale empty !!'))
//       } else {
//         return Promise.resolve(lan)
//       }
//     }).then((message) => {
//       cb(null, message)
//     }).catch((error) => {
//      cb(error)
//     })
//   }
