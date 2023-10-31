<template>
    <div class="readMore d-flex align-end justify-center">
        <v-btn text color="#016670" size="x-large" @click="$emit('readMore')">
            <span>بیشتر بخوانید</span>
        </v-btn>
    </div>
</template>

<script>

export default {

}
</script>

<style scoped>
.readMore {
    background-image: linear-gradient(transparent, #FFFFFF);
    font-family: boldbakhtiari !important;
    margin-top: -380px;
    height: 400px;
    width: 100%;
    z-index: 1000;
    position: relative;
}
</style>