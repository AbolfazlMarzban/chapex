<template>
    <div v-if="data && defaults" class="manage-user-table">

        <Navigation :Tabs="navigationTabs" :accordianValues="accordianValues" @openAll="openAll" @closeAll="closeAll" />

        <v-expansion-panels v-model="accordianValues" multiple>
            <PersonalInfo :data="data" :defaults="defaults" :readonly="readonly" />

            <AdditionalInfo :data="data" :defaults="defaults" :readonly="readonly" />

            <RelationInfo :data="data" :defaults="defaults" :readonly="readonly" />

            <AddressInfo :userData="data" :defaults="defaults" :readonly="readonly" />

            <TaxInfo :userData="data" :defaults="defaults" :readonly="readonly" />
        </v-expansion-panels>

    </div>
</template>

<script>
import PersonalInfo from './profile/PersonalInfo.vue';
import AdditionalInfo from './profile/AdditionalInfo.vue';
import RelationInfo from './profile/RelationInfo.vue';
import AddressInfo from './profile/AddressInfo.vue';
import TaxInfo from './profile/TaxInfo.vue';

export default {
    props: ["readonly", "data", "defaults"],
    components: { PersonalInfo, AdditionalInfo, RelationInfo, AddressInfo, TaxInfo },

    data() {
        return {
            navigationTabs: ["اطلاعات شخصی", "اطلاعات تکمیلی", "اطلاعات ارتباطی", "نشانی پستی", "اطلاعات مالیاتی"],
            accordianValues: [],
        }
    },

    methods: {
        openAll() {
            this.accordianValues = [];
            for (var i = 0; i <= 4; i++) {
                this.accordianValues.push(i);
            }
        },

        closeAll() {
            this.accordianValues = [];
        },
    }
};
</script>

<style lang="scss" scoped></style>