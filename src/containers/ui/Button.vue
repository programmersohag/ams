<template>
    <b-button 
        :type="type" 
        v-if="isLoad" size="sm" 
        :disabled="isDisabled"
        @click="handleEvent" 
        :variant="variant" 
        :class="btnClass">
        <i class="fa" :class="icon"> </i>&nbsp;{{name}}
    </b-button>
</template>
<script>
import { EventBus } from '@/shared/common/event-bus.js';
export default {
    name: "Button",
    props: {
        btnType:{default:'back'},
        isName:{default: ''},
        isDisabled:{default:false},
        btnClass:{
            default: ''
        }
    },
    data() {
        return {
            variant:'',
            icon:'',
            name:'',
            isLoad:false,
            type:'button',
        }
    },
    mounted() {
        this.loadData();
        this.isLoad = true;
    },
    methods: {
        loadData: function() {
            switch (this.btnType) {
            case 'back':
                this.variant = "primary";
                this.icon = "fa-reply";
                this.name = this.isName ? this.$t(this.isName) : this.$t("back");
                break;
            case 'add':
                this.variant = "info";
                this.icon = "fa-plus";
                this.name = this.isName ? this.$t(this.isName) : this.$t("add");
                break;
            case 'edit':
                this.variant = "warning";
                this.icon = "fa-edit";
                this.name = this.isName ? this.$t(this.isName) : this.$t("edit");
                break;
            case 'delete':
                this.variant = "danger";
                this.icon = "fa-trash";
                this.name = this.isName ? this.$t(this.isName) : this.$t("delete");
                break;
            case 'view':
                this.variant = "primary";
                this.icon = "fa-eye";
                this.name = this.isName ? this.$t(this.isName) : this.$t("view");
                break;
            case 'reset':
                this.variant = "warning";
                this.icon = "fa-refresh";
                this.type = "reset";
                this.name = this.isName ? this.$t(this.isName) : this.$t("reset");
                break;
            case 'handle-reset':
                this.variant = "warning";
                this.icon = "fa-refresh";
                this.name = this.isName ? this.$t(this.isName) : this.$t("reset");
                break;
            case 'cancel':
                this.variant = "danger";
                this.icon = "fa-close";
                this.name = this.isName ? this.$t(this.isName) : this.$t("cancel");
                break;
            case 'submit':
                this.variant = "success";
                this.icon = "fa-save";
                this.type = "submit";
                this.name = this.isName ? this.$t(this.isName) : this.$t("save");
                break;
            case 'search':
                this.variant = "primary";
                this.icon = "fa-search fa-sm";
                this.type = "submit";
                this.name = this.isName ? this.$t(this.isName) : this.$t("search");
                break;
            case 'sync':
                this.variant = "primary";
                this.icon = "fa-refresh";
                this.name = this.isName ? this.$t(this.isName) : this.$t("sync");
                break;
            case 'next':
                this.variant = "primary";
                this.icon = "fa-arrow-right";
                this.name = this.isName ? this.$t(this.isName) : this.$t("next");
                break;
            case 'pev':
                this.variant = "info";
                this.icon = "fa-arrow-left";
                this.name = this.isName ? this.$t(this.isName) : this.$t("previous");
                break;
            }
        },
        handleEvent: function() {
            if(this.btnType == 'back') {
                this.$router.go(-1);
            } else {
                this.$emit("clicked");
            }
        },
        // computed: {

        // }
    }
};
</script>
