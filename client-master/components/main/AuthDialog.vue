<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="100%" class="goods_dialogs_main">
            <v-card class="goods_dialog">
                <v-card-title> </v-card-title>

                <v-card-text>


                    <div class="goods_dialog_title">
                        ورود / عضویت
                    </div>

                    <v-divider></v-divider>

                    <div class="goods_dialog_text">
                        <div class="">
                            <v-row>
                                <v-col cols="12">
                                    <LazyAuth @done="done" />
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
import '../../assets/style/goods/goodsDialogs.scss';
export default {

    data() {
        return {
            dialog: true,
        };
    },

    methods: {
        done() {
            this.$emit('done')
        }

    },
};
</script>
  