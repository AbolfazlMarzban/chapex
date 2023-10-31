<template>
    <div class="text-center">
        <v-dialog persistent v-model="dialog" width="500" class="goods_dialogs_main">
            <v-card class="goods_dialog">
                <v-card-title>                  
                    <v-row>
                        <v-col cols="12">
                            آپلود عکس
                        </v-col>
                    </v-row>
                </v-card-title>

                <v-card-text>
                    <v-divider></v-divider>
                    <v-row>
                        <v-col cols="1"></v-col>
                        <v-col cols="10">
                            <ui-image-uploader :readonly="readonly" :value="value" accept="jpg, jpeg, png" @input="setUrl"
                                :state="state" />
                        </v-col>
                        <v-col cols="1"></v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="1"></v-col>
                        <v-col cols="10">
                            <label>نام فایل</label>
                            <ui-input v-model="img.TPIC_FName"></ui-input>
                        </v-col>
                        <v-col cols="1"></v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="1"></v-col>
                        <v-col cols="10">
                            <label>نوشته جایگزین</label>
                            <ui-input v-model="img.alt"></ui-input>
                        </v-col>
                        <v-col cols="1"></v-col>
                    </v-row>
                    <v-spacer></v-spacer>
                    <v-row>
                        <v-col cols="6" class="text-right">
                            <v-btn v-if="value" @click="$emit('submit', img)" dark color="teal">
                                ویرایش
                            </v-btn>

                            <v-btn v-else-if="img.path" @click="$emit('submit', img)" dark color="teal">
                                افزودن
                            </v-btn>
                        </v-col>

                        <v-col cols="6" class="text-left">  
                            <v-btn @click="cancel"> بستن </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>

                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
  
<script>
import { v4 as uuidv4 } from "uuid";

export default {
    props: ["value", "readonly", "state"],

    data() {
        return {
            dialog: true,
            img: {
                TPIC_FID: uuidv4(),
                TPIC_FName: '',
                alt: '',
                TPIC_FDelete: 0,
                isnew: true
            },
        };
    },
    async mounted() {
        if (this.value) {
            this.img = this.value
        }
    },
    methods: {
        setUrl(img) {
            this.img.path = img.path
            this.img.thumbnail_path = img.thumbnail_path
            this.img.TPIC_FName = img.TPIC_FName
        },

        async cancel() {
            if (!this.value && this.img.path) {
                try {
                    var result = await this.$authAxios.$post("image/delete", { data: this.img });
                    if (result) {
                    }
                }
                catch (error) {
                    console.log(error);
                    this.showResponseErrors(error);
                }
            }

            this.$emit('cancel')
        }
    },
};
</script>
  