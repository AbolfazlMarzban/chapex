<template>
    <div class="text-center">
        <v-dialog persistent v-model="showDeleteDialog" width="500" class="goods_dialogs_main">
            <v-card class="goods_dialog">

                <v-card-text class="pt-4">

                    <div class="goods_dialog_title">
                        درخواست حذف
                    </div>
                    <v-divider></v-divider>

                    <p class="text-center mt-4 mb-0 pb-0 red-text">آیا از حذف این آدرس اطمینان دارید؟</p>
                    <!-- {{data[dialogData].TGO_FName}} -->

                    <v-btn text @click="deleteItemFromTable" class="goods_dialog_btn mt-4">
                        بله
                    </v-btn>
                    <v-btn text @click="hiddenDialog" class="goods_dialog_btn mt-4">
                        خیر
                    </v-btn>

                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
  
<script>
import '../../../../../../assets/style/goods/goodsDialogs.scss';
export default {
    data() {
        return {
            showDeleteDialog: true
        };
    },

    methods: {
        hiddenDialog() {
            this.$emit("hiddenDialog")
        },
        deleteItemFromTable() {
            this.$emit("deleteItemFromTable");
        }
    },
};
</script>
  