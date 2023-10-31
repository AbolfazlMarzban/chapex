<template>
    <v-spacer class="mx-auto" :height="`${element.TFF_FDefault}`" :width="`${element.TFF_FPlaceHolder}%`" />
</template>

<script>
export default {
    props: ["element", "readonly"]
}
</script>