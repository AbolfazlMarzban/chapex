<template>
    <v-container>
        <OptionSelector v-for="option in salePageStatus.salePage.options" :key="option.TD_FOrder" :option="option" />
    </v-container>
</template>

<script>

import OptionSelector from './SelectorSections/OptionSelector.vue';

export default {
    inject: ["salePageStatus"],
    components: { OptionSelector },
}
</script>