<template>
    <input :reset="isReset" autocomplete="off"/>
</template>

<script>
  export default {
    name: 'DatePicker',
    props: [ 'dateFormat','value', 'maxDate' ],
    data() {
        return {
        }
    },
      mounted(){
          var self = this;
          $(this.$el).datepicker({
              changeMonth: true,
              changeYear: true,
              yearRange: '-80:+20',
              maxDate: this.maxDate,
              showButtonPanel: true,
              dateFormat: this.dateFormat,
              onSelect: function(date) {
                  $(this).change();
                  self.$emit('input', date);
              }
          }).on("change", function() {
              self.$emit('input', this.value);
              self.$emit('onChange', this.value);
          });
          $(this.$el).val(this.value);
      },
      beforeDestroy: function() {
          $(this.$el).datepicker('hide').datepicker('destroy');
      },
      computed: {
          isReset: function() {
              if(this.value === ''){
                  $(this.$el).datepicker('setDate', null);
              }else{
                  $(this.$el).datepicker('setDate', this.value);
              }
          }
      }
  };
</script>

<style>
  .error_message_color{
    color: red;
  }
  #ui-datepicker-div
  {
      font-size: 12px;
      background: white;
  }

</style>
