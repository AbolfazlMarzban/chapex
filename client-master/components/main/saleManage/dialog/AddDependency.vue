<template>
    <div class="text-center">
        <v-dialog persistent v-model="dialog" class="goods_dialogs_main" width="500">
            <v-card class="goods_dialog">
                <v-card-title></v-card-title>
                <v-card-text>
                    <div class="goods_dialog_title"> ویرایش خصوصیت
                        <v-btn text color="#016670" v-if="status == 'edit'">حذف</v-btn>
                        <v-btn text color="#016670" v-if="status == 'edit'">ویرایش</v-btn>
                    </div>
                    <div>
                        <v-row class="mt-1">
                            <v-col cols="4">    
                                <span><label>نام خصوصیت:</label></span>
                            </v-col>
                            <v-col cols="8">
                                <v-text-field class="pt-0 mt-0" :disabled="readonly"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">    
                                <span><label>مقدارهای انتخابی:</label></span>
                            </v-col>
                            <v-col cols="8">
                                <v-text-field class="pt-0 mt-0" :disabled="readonly"></v-text-field>
                            </v-col>
                        </v-row>
                    </div>
                    <v-btn text class="goods_dialog_btn mt-4">
                        تایید
                    </v-btn>
                    <v-btn text @click="$emit('cancel')" class="goods_dialog_btn mt-4">
                        بستن
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    props: ["status", "readonly"],
    data() {
        return {
            dialog: true
        }
    }
}
</script>

<style>
</style>