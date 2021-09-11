<template>
    <div class="mf-loader">
        <div class="spinner-border text-primary" :style="loaderStyle" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</template>
<script>
export default {
    name: "Loader",
    props: {
        loaderStyle:{
            default: function () {
                return {
                    position : "absolute",
                    top: "50%",
                    left: "50%"
                }
            }
        }
    }
}
</script>
