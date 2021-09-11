export default {
  methods: {
    previousPage: function () {
      this.errors.clear();
      this.current_step = this.current_step - 1;
      this.is_save_button_show = false;
      this.class_header = [];
      this.title_class = [];
      if (this.current_step === this.total_steps) {
        this.is_prev_button_disable = false;
        this.is_next_button_disable = true;
      } else if (this.current_step === 1) {
        this.is_prev_button_disable = true;
        this.is_next_button_disable = false;
      } else {
        this.is_prev_button_disable = false;
        this.is_next_button_disable = false;
      }
      for (let i = 1; i <= this.total_steps; i++) {
        if (i < this.current_step) {
          this.class_header[i] = 'md-step active done';
          this.title_class[i] = 'md-step-title';
        } else if (i === this.current_step) {
          this.class_header[i] = 'md-step editable';
          this.title_class[i] = 'md-step-title editable';
        } else {
          this.class_header[i] = 'md-step';
          this.title_class[i] = 'md-step-title';
        }
      }
    },
    nextPage: function () {
      console.log('next page', this.current_step);
      this.current_step = this.current_step + 1;
      this.class_header = [];
      if (this.current_step === this.total_steps) {
        this.is_save_button_show = true;
      }
      if (this.current_step === this.total_steps) {
        this.is_prev_button_disable = false;
        this.is_next_button_disable = true;
      } else if (this.current_step === 1) {
        this.is_prev_button_disable = true;
        this.is_next_button_disable = false;
      } else {
        this.is_prev_button_disable = false;
        this.is_next_button_disable = false;
      }

      for (let i = 1; i <= this.total_steps; i++) {
        if (i < this.current_step) {
          this.class_header[i] = 'md-step active done';
        } else if (i === this.current_step) {
          this.class_header[i] = 'md-step editable';
          this.title_class[i] = 'md-step-title editable';
        } else {
          this.class_header[i] = 'md-step';
        }
      }
    },
    nextStep: function () {
      this.current_step = this.current_step + 1;
      this.is_save_button_show = false;
      this.class_header = [];
      if (this.current_step === this.total_steps) {
        this.is_save_button_show = true;
      }
      if (this.current_step === this.total_steps) {
        this.is_prev_button_disable = false;
        this.is_next_button_disable = true;
      } else if (this.current_step === 1) {
        this.is_prev_button_disable = true;
        this.is_next_button_disable = false;
      } else {
        this.is_prev_button_disable = false;
        this.is_next_button_disable = false;
      }
      for (let i = 1; i <= this.total_steps; i++) {
        if (i < this.current_step) {
          this.class_header[i] = 'md-step active done';
        } else if (i === this.current_step) {
          this.class_header[i] = 'md-step editable';
        } else {
          this.class_header[i] = 'md-step';
        }
      }
    },
    changeStep: function (index) {
      if (this.method_name !== 'add') {
        this.current_step = index;
        this.class_header = [];

        if (this.current_step === this.total_steps) {
          this.is_save_button_show = true;
        }
        if (this.current_step === this.total_steps) {
          this.is_prev_button_disable = false;
          this.is_next_button_disable = true;
        } else if (this.current_step === 1) {
          this.is_prev_button_disable = true;
          this.is_next_button_disable = false;
        } else {
          this.is_prev_button_disable = false;
          this.is_next_button_disable = false;
        }
        for (let i = 1; i <= this.total_steps; i++) {
          if (i < this.current_step) {
            this.class_header[i] = 'md-step active done';
          } else if (i === this.current_step) {
            this.class_header[i] = 'md-step editable';
            this.title_class[i] = 'md-step-title editable';
          } else {
            this.class_header[i] = 'md-step';
          }
        }
      }
    },
  }
}
