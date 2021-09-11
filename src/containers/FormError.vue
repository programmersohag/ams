<template>
    <span v-show="message != ''" class="custom-error-validation" v-html="message"></span>
</template>
<script>
  export default {
    name: 'FormError',
    props: {
      message: String
    },    
    data() {
        return {
                   
        }
    }    
  };
</script>
<style>
.custom-error-validation{
  display: block;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #f86c6b;
}
</style>
