import {getScheduleById} from "@/components/services/schedules/schedule/Common";

export default {
  name: "Save",
  props: {
    id: null,
    extra_param: Object,
  },
  data() {
    return {
      formData: {},
    }
  },
  mounted() {
    if (this.id) {
      getScheduleById(this.id).then(data => {
        this.formData = data;
      }).catch(error => {
        console.error(error);
      });
    }
  }
}
