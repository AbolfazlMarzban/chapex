<template>
    <v-col cols="12" class="tabs-wrapper-flex">
        <v-row class="text-center tabs-group m-tabs-0 d-flex flex-column  rounded-t-lg">
            <v-row class="justify-center align-center rounded-b-0">
                <v-col cols="12" xl="2" lg="2" md="12" sm="12" xs="12" @click="tabActive(tab)"
                    :class="['tabs-item pt-0 pb-0', { active: tab.active }]" v-for="(tab, index) in data" :key="index">
                    <span class="tabs-item-text">{{ tab.TD_FName }}</span>
                </v-col>
            </v-row>

            <!-- <v-row>
    <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12" class="text-left tabs-record">
        <span class="fns-18 black-color"> تعداد رکورد : {{record}} عدد</span>
    </v-col>
    </v-row> -->


        </v-row>



    </v-col>
</template>

<script>
export default {
    props: ["data", "record", "default"],
    data() {
        return {
            currentActive: 0,
        };
    },
    mounted() {
        const a = this.data.filter(tab => {
            tab.TD_FID == this.default
        })
        // console.log(a)
    },
    methods: {
        tabActive(tab) {
            for (let item of this.data) {
                if (item.TD_FID == tab.TD_FID) {
                    item.active = true;
                } else {
                    item.active = false;
                }
            }

            this.$emit("clicked", tab)
        },
    },
};
</script>

<style lang="scss" src="../../../assets/style/Ul/Tab.scss"></style>
