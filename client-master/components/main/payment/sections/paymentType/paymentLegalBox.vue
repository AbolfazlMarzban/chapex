<template>
    <v-dialog v-model="show" width="auto">
        <v-card>
            <v-card-title>
                <v-row>
                    <v-col cols="12" class="text-left pb-0">
                        <v-icon color="#016670" @click="$emit('closeLegal')">mdi-close</v-icon>
                    </v-col>
                    <v-col cols="12" class="py-0 text-center">
                        <label for="" class="fn-bold fns-18" style="color: #016670;">اطلاعات مالیاتی</label>
                        <hr style="width: 100%;">
                    </v-col>
                </v-row>
            </v-card-title>
            <v-card-text>
                <LazyLegalInfo @selectedLegal="value => selectedLegal(value)" :table="table" @getTax="$emit('getTax')" />
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ["show", "table", "paymentData"],
    mounted() {
        this.getUser()
    },
    data() {
        return {
            userData: {},
        }
    },
    methods: {
        selectedLegal(value) {
            this.paymentData.legalInfo = value
            this.$emit('closeLegal')
        },
        async getUser() {
            try {
                let data = await this.$axios.$get("/user", {
                    headers: {
                        Authorization: "Bearer " + this.$store.getters["login/getUserData"]().token,
                    },
                });
                this.userData = data.user
            } catch (error) {
                console.log(error);
            }
        },

    }
}
</script>

<style></style>