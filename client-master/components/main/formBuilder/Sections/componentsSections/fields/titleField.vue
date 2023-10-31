<template>
    <component class="mx-auto" :is="element.TFF_FPlaceHolder?element.TFF_FPlaceHolder:'p'">
        {{element.TFF_FLable}}
    </component>
</template>

<script>
export default {
    props: ["element", "readonly"]
}
</script>