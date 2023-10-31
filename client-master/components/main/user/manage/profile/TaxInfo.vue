<template>
    <v-expansion-panel class="togglebox">
        <accordian-title title="اطلاعات مالیاتی" :unsaved="false" :readonly="readonly" />

        <v-expansion-panel-content>
            <v-card class="">
                <v-card-text>
                    <v-row class="manage_user_row">

                        <v-col v-if="userData && userData.TU_FID" cols="12">
                            <UserTaxList :userId="userData.TU_FID" :readonly="readonly" />
                        </v-col>

                    </v-row>
                </v-card-text>
            </v-card>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
import UserTaxList from './taxInfo/UserTaxList.vue';

export default {
    props: ["userData", "defaults", "readonly"],
    components: { UserTaxList }
}
</script>