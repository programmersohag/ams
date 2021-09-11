<template>
   <div v-if="isVisible" class="loader-overlay">
       <div class="loader">
           <div class="loader-6-circle"></div>
           <div class="loader-6-circle"></div>
           <div class="loader-6-circle"></div>
           <div class="loader-6-circle"></div>
           <div class="loader-6-circle"></div>
           <div class="loader-6-circle"></div>
           <div class="loader-6-circle"></div>
           <div class="loader-6-circle"></div>
           <div class="loader-6-circle"></div>
           <div class="loader-6-circle"></div>
           <div class="loader-6-circle"></div>
           <div class="loader-6-circle"></div>
       </div>
       <span class="text" v-html="text"></span>
   </div>
</template>
 
<script>
   export default {
       name: "Loader1",
       props: {
           isVisible: {type: Boolean, required: true},
           text: {type: String, required: false, default: ""},
       },
}
</script>
 
<style lang="scss">
   .loader-overlay {
       position: fixed;
       width: 100%;
       height: 100%;
       top: 0;
       left: 0;
       right: 0;
       bottom: 0;
       background-color: rgba(0, 0, 0, 0.7);
       z-index: 999;
       cursor: pointer;
       span.text {
           display: inline-block;
           position: relative;
           top: 50%;
           left: 50%;
           transform: translate(-50%,-50%);
           color: #fff;
       }
       .loader {
           animation: loader-animate 1.5s linear infinite;
           // clip: rect(0, 80px, 80px, 40px);
           height: 80px;
           width: 80px;
           position: absolute;
           left: calc(50% - 40px);
           top: calc(50% - 40px);
           .loader-6-circle {
               height: 12px;
               width: 12px;
               position: absolute;
               border-radius: 50%;
               background: var(--table_thead_color);
               animation-name: flash;
               animation-duration: 1.2s;
               animation-timing-function: linear;
               animation-iteration-count: infinite;
               }
 
               .loader-6-circle:nth-child(1) {
               left: 50%;
               top: -7px;
               transform: translateX(-50%);
               animation-delay: 0s;
               }
 
               .loader-6-circle:nth-child(2) {
               left: 77%;
               top: -2px;
               transform: translateX(-50%);
               animation-delay: 0.1s;
               }
 
               .loader-6-circle:nth-child(3) {
               left: 95%;
               top: 12px;
               transform: translateX(-50%);
               animation-delay: 0.2s;
               }
 
               .loader-6-circle:nth-child(4) {
               top: 50%;
               right: -7px;
               transform: translateY(-50%);
               animation-delay: 0.3s;
               }
 
               .loader-6-circle:nth-child(5) {
               top: 77%;
               right: -2px;
               transform: translateY(-50%);
               animation-delay: 0.4s;
               }
 
               .loader-6-circle:nth-child(6) {
               top: 95%;
               right: 12px;
               transform: translateY(-50%);
               animation-delay: 0.5s;
               }
 
               .loader-6-circle:nth-child(7) {
               left: 50%;
               bottom: -7px;
               transform: translateX(-50%);
               animation-delay: 0.6s;
               }
 
               .loader-6-circle:nth-child(8) {
               left: 25%;
               bottom: -2px;
               transform: translateX(-50%);
               animation-delay: 0.7s;
               }
 
               .loader-6-circle:nth-child(9) {
               left: 6%;
               bottom: 12px;
               transform: translateX(-50%);
               animation-delay: 0.8s;
               }
 
               .loader-6-circle:nth-child(10) {
               top: 50%;
               left: -7px;
               transform: translateY(-50%);
               animation-delay: 0.9s;
               }
 
               .loader-6-circle:nth-child(11) {
               top: 25%;
               left: -2px;
               transform: translateY(-50%);
               animation-delay: 1s;
               }
 
               .loader-6-circle:nth-child(12) {
               top: 7%;
               left: 12px;
               transform: translateY(-50%);
               animation-delay: 1.1s;
               }
          
       }
    
   }
</style>
