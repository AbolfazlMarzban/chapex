<template>
    <div v-if="this.selected" class="text-center">
        <v-dialog v-model="showDuplicateDialog" width="500" class="goods_dialogs_main">
            <v-card class="goods_dialog">
                <!-- <v-card-title> </v-card-title> -->

                <v-card-text class="pa-4">
                    <div class="goods_dialog_title">
                        درخواست تکثیر
                    </div>
                    <v-divider></v-divider>
                    <div class="goods_dialog_text">
                        <div>
                            <v-col cols="12">
                                <span><label> شما متقاضی تکثیر فرم </label>
                                    <pre class="goods_dialog_text-data"></pre>
                                </span>
                                <p class="text-center">
                                    کد
                                    <span class="red-text">{{ this.selected.TF_FID }}</span> به نام
                                    <span class="red-text">{{ this.selected.TF_FName }}</span>
                                    هستید
                                </p>
                            </v-col>
                        </div>
                    </div>
                    <v-divider></v-divider>

                    <p class="text-center mt-4 mb-0 pb-0 red-text">
                        آیا از عملیات بالا اطمینان دارید؟
                    </p>

                    <v-btn text @click="hiddenDialog" class="goods_dialog_btn mt-4">
                        انصراف
                    </v-btn>
                    <v-btn text @click="duplicate()" class="goods_dialog_btn mt-4">
                        تایید
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
  
<script>
import "../../../../assets/style/goods/goodsDialogs.scss";
import formBuilderMixins from "../_mixins/formBuilderMixin";

export default {
    props: ["showDuplicateDialog", "selected"],

    mixins: [formBuilderMixins],


    data() {
        return {
            data: {},
            // fields: [],
        };
    },
   
    async mounted() {
        // await this.getForm()
    },

    methods: {
        hiddenDialog() {
            this.$emit("hiddenDialog");
        },
        async duplicate() {
            console.log('get show', this.selected.TF_FID);
            const result = await this.getShow(this.selected.TF_FID);

            if (result.form) {
                console.log('result', result);

                this.data = result.form;
                this.data.fields = result.formFields;

                this.data.TF_FID = 0
                this.data.TF_FName = 'کپی_' + this.data.TF_FName

                // this.data.fields.forEach(field => {
                //     field.TFF_FID = 0
                //     field.TFF_FID_Form = null
                //     field.TFF_FID_ParentFormField = null
                // });
                for(var i=0; i< this.data.fields.length; i++){
                    this.data.fields[i].TFF_FID = 0
                    this.data.fields[i].TFF_FID_Form = null
                    this.data.fields[i].TFF_FID_ParentFormField = null
                }
                console.log('data', this.data)
                const result1 = await this.SubmitFormBuilder("insert", this.data);
                if (result1) {
                    this.$emit("duplicated");
                }
            }
        }
    }
};
</script>
  