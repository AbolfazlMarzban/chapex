<template>
    <div class="text-center">
        <v-dialog persistent v-model="dialog" width="500" class="goods_dialogs_main">
            <v-card class="goods_dialog">
                <v-card-title> </v-card-title>

                <v-card-text>


                    <div class="goods_dialog_title">
                        درخواست حذف
                    </div>

                    <v-divider></v-divider>

                    <div class="goods_dialog_text">
                        <div class="">
                            <v-row>
                                <v-col cols="12">
                                    <v-img style="margin:auto" :lazy-src="setImageUrl(item.path)"
                                        :src="setImageUrl(item.path)" max-height="300" max-width="300">
                                    </v-img>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="12">
                                    <p class="text-center mt-4 mb-0 pb-0 red-text">آیا از حذف تصویر اطمینان دارید؟</p>

                                    <v-btn text @click="$emit('deleteItemFromTable', item)"
                                        class="goods_dialog_btn mt-4">
                                        بله
                                    </v-btn>
                                    <v-btn text @click="$emit('hiddenDialog')" class="goods_dialog_btn mt-4">
                                        خیر
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </div>
                    </div>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
  
<script>
import '../../../../assets/style/goods/goodsDialogs.scss';
export default {
    props: ["showDeleteDialog", "item"],

    data() {
        return {
            dialog: true,

        };
    },

    methods: {

    },
};
</script>
  