<template>
    <div class="card no-found">
        <div class="card-body" :style="{ margin: [cssStyle] }">{{ message }}</div>
    </div>
</template>
<script>
export default {
    props: {
        cssStyle:{
            default: '145px auto'
        },
        message:{
            default: 'No Data Found'
        }
    },
}
</script>

<style scoped>
    .no-found .card-body{
        width: 50%;
        color: green !important;
        font-size: 20px;
    }
</style>
