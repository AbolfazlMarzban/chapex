<template>
    <v-card tile v-if="data.TPS_FIDs_NumberList && data.TPS_FIDs_NumberList.length > 0">
        <v-list nav dense>
            <v-list-item-group v-model="selectedItem" color="primary">
                <v-list-item v-for="(item, i) in data.TPS_FIDs_NumberList" :key="i">
                    <v-list-item-icon v-if="item == data.TPS_FNumberDefault">
                        <v-icon color="indigo">mdi-radiobox-marked</v-icon>
                    </v-list-item-icon>

                    <v-list-item-icon v-else @click="setAsDefault(item)">
                        <v-icon color="indigo">mdi-radiobox-blank</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title v-text="item"></v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon v-if="selectedItem == i" @click="deleteItem(i)">
                        <v-icon color="pink">mdi-delete-forever</v-icon>
                    </v-list-item-icon>

                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-card>
</template>

<script>
export default {
    props: ["data", "readonly"],
    data() {
        return {
            selectedItem: -1,
        }
    },
    methods: {
        deleteItem(index) {
            if (index > -1) {
                this.data.TPS_FIDs_NumberList.splice(index, 1);
            }
        },
        setAsDefault(item) {
            // this.$emit('defaultValueChanged', item)
            this.data.TPS_FNumberDefault = Number(item)

        }
    }
}
</script>