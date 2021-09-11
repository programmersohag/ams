<template>
    <b-modal
            class="modal-primary"
            :visible="is_visible"
            :noCloseOnEsc="true"
            :noCloseOnBackdrop="true"
            :hideFooter="true"
            @cancel-disabled="false"
            :size="size">
        <div slot="modal-header">
            <h5 class="modal-title">{{title}}</h5>
            <span @click="close" style="position: absolute;right: 11px;top: 5px;cursor: pointer;"><i style="font-size: 20px;" class="fa fa-window-close" aria-hidden="true"></i></span>
        </div>
        <component :is="component" @close="close" :parameterArr="parameterArr" />
    </b-modal>
</template>

<script>
    export default {
        name: 'CustomModal',
        props: {
            title: String,
            componentAddress: String,
            parameterArr: Array,
            size: {
                type: String,
                default: 'md'
            }
        },
        data() {
            return {
                component: null ,
                is_visible: false,
                show: false,
            }
        },
        mounted() {
            return new Promise((resolve, reject) => {
                this.is_visible = true;
                this.component = require("@/components/"+this.componentAddress+".vue").default;
                resolve(true);
            })
        },
        methods: {
            close(is_load_data) {
                this.is_visible = false;
                this.$emit('close',is_load_data);
            }
        },
    };
</script>

<style scoped>
    .close {display: none;}
</style>
