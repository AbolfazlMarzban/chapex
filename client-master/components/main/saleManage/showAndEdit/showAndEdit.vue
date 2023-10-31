<template>
    <div class="mb-4">
        <v-expansion-panels :value="0" accordion>

            <BaseInfo :data="data" :readonly="readonly" :defaults="defaults" :wizardView="false">
            </BaseInfo>

            <MemoInfo :data="data" :readonly="readonly" :defaults="defaults" :wizardView="false">
            </MemoInfo>

            <Counting :data="data" :readonly="readonly" :defaults="defaults" :wizardView="false">
            </Counting>

            <Options :data="data" :readonly="readonly" :defaults="defaults" :wizardView="false">
            </Options>

            <Products :data="data" :readonly="readonly" :defaults="defaults" :wizardView="false">
            </Products>

            <Uploader :data="data" :readonly="readonly" :defaults="defaults" :wizardView="false">
            </Uploader>

        </v-expansion-panels>
    </div>
</template>

<script>

import saleMixins from "../_mixins/saleManageMixin";

export default {
    mixins: [saleMixins],
    data() {
        return {

        }
    },
    props: [
        "readonly",
        "data",
        "defaults"
    ],
    async mounted() {
        
    }
}
</script>