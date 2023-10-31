<template>
    <div class="text-center">
        <v-dialog persistent v-model="dialog" width="500" class="goods_dialogs_main">
            <v-card class="goods_dialog">
                <v-card-title>
                    <v-row>
                        <v-col cols="12" class="title">
                            <span>{{ title }}</span>
                        </v-col>
                    </v-row>
                </v-card-title>

                <v-card-text>
                    <v-divider></v-divider>
                    <v-row>
                        <v-col cols="12" class="goods_dialog_text">
                            <span>{{ comment }}</span>
                        </v-col>
                    </v-row>

                    <v-row class="justify-center">
                        <v-col cols="6">
                            <v-btn class="goods_dialog_btn mt-4" @click="$emit('submit')">تایید</v-btn>
                        </v-col>
                        <v-col cols="6">
                            <v-btn @click="$emit('cancel')" class="goods_dialog_btn mt-4">انصراف</v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>

                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

export default {
    props: ["title", "comment"],

    data() {
        return {
            dialog: true
        }
    }
}
</script>