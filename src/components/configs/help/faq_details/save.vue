<template>
    <div class="animated fadeIn">
        <b-form @submit.prevent= "handleSubmit" autocomplete="off">
            <FormGenerator
                    :schema="schema"
                    :formValue="formData"
                    :errorMessage="errorMessage">
            </FormGenerator>
            <div class="text-center">
                <b-button type="submit"  size="sm" variant="success" class="mr-2"><i class="fa fa-dot-circle-o"></i> {{ $t("submit") }} </b-button>
                <b-button type="reset" size="sm" variant="primary" class="mr-2" v-on:click.prevent="handleReset"><i class="fa fa-reply fa-lg mt-1.9"> </i>{{ $t("reset") }}</b-button>
                <b-button type="reset" size="sm" variant="danger" class="mr-2" v-on:click="handleCancel"><i class="fa fa-close fa-lg mt-1.9"></i>{{ $t("cancel") }}</b-button>
            </div>
        </b-form>
    </div>
</template>
<script src="@/components/services/configs/help/faq_details/save.js"></script>

<style scoped>
    .error-color{
        color: red;
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
</style>
