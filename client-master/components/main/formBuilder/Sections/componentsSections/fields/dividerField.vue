<template>
    <v-divider class="mx-auto" :style="`border-width: ${element.TFF_FDefault}px !important;`"
            :width="`${element.TFF_FPlaceHolder}%`" />
</template>

<script>
export default {
    props: ["element", "readonly", "deleteForm"]
}
</script>