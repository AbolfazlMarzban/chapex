<template>
    <v-card max-width="300" tile v-if="items.length > 0">
        <v-list nav dense>
            <v-list-item-group v-model="selectedItem" color="primary">
                <v-list-item v-for="(item, i) in items.filter(it => it.TD_FDelete == 0)" :key="i">
                    <v-list-item-content>
                        <v-list-item-title v-text="item.TD_FName"></v-list-item-title>
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
    props: ["items"],
    data() {
        return {
            selectedItem: -1,
        }
    },
    methods: {
        deleteItem(index) {
            if (index > -1) {
                this.items[index].TD_FDelete = 1
                // this.items.splice(index, 1);
            }
        },
    }
}
</script>