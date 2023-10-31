<template>
    <span 
    v-show="element.TFF_FRequired"
     class="req-cyrcel" ></span>
</template>
<script>
export default {
     props: ["element", "readonly"]
}
</script>
<style lang="scss">
.req-cyrcel{
    height: 10px;
    width: 10px;
    background: #E9083E;
    display: inline-block;
    border-radius: 50%;
}
</style>