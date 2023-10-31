<template>
    <div>
        <v-row>
            <v-col cols="12" class="salePageTitle">{{ salePageStatus.salePage.TPS_FTitle }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="selectedChildrenStr ps-5 pt-0">
                <FooterSelectedChildren />
            </v-col>
        </v-row>

    </div>
</template>

<script>
import FooterSelectedChildren from './FooterSelectedChildren.vue';


export default {
    inject: ["salePageStatus"],
    components: { FooterSelectedChildren }
}
</script>

<style scoped>
.salePageTitle {
    font-size: 28px;
    color: #016670;
    text-align: right;
}

.selectedChildrenStr {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
    text-align: right;
    overflow: hidden;
}
</style>