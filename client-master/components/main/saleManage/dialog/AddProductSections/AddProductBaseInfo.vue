<template>
    <v-expansion-panel class="togglebox">
        <accordian-title title="اطلاعات پایه" :unsaved="false" />
        <v-expansion-panel-content>
            <v-row>

                <v-col cols="3">
                    <ui-input type="text" class="form_control_textInput" label="نام محصول  " placeholder=" "
                        :readonly="readonly" v-model="product.TGO_FName" />
                </v-col>

                <v-col cols="3">
                    <label>گروه محصول</label>

                    <v-edit-dialog v-if="!readonly" ref="categoryDialog">
                        <v-btn rounded outline dense color="#F2F2F2">
                            <span v-if="product.TGO_FID_Category1">{{ selectedCategoryTitle }}</span>
                            <span v-else>انتخاب...</span>
                        </v-btn>

                        <template v-slot:input>
                            <v-treeview activatable @update:active="category1Changed" :items="defaults[272]"
                                item-key="TD_FID" item-text="TD_FName" return-object>
                            </v-treeview>
                        </template>
                    </v-edit-dialog>

                    <div v-else>
                        <span v-if="product.TGO_FID_Category1">{{ selectedCategoryTitle }}</span>
                        <span v-else>انتخاب نشده</span>
                    </div>

                </v-col>

                <v-col cols="3">
                    <label>نوع محصول</label>
                    <v-edit-dialog v-if="!readonly" ref="typeDialog">
                        <v-btn rounded outline dense color="#F2F2F2">
                            <span v-if="product.TGO_FID_Type">{{ selectedTypeTitle }}</span>
                            <span v-else>انتخاب...</span>
                        </v-btn>

                        <template v-slot:input>
                            <v-treeview activatable @update:active="typeChanged" :items="defaults[207]" item-key="TD_FID"
                                item-text="TD_FName" return-object>
                            </v-treeview>
                        </template>
                    </v-edit-dialog>

                    <div v-else>
                        <span v-if="product.TGO_FID_Type">{{ selectedTypeTitle }}</span>
                        <span v-else>انتخاب نشده</span>
                    </div>
                </v-col>


                <v-col cols="3">
                    <v-row>
                        <v-col :cols="readonly ? 12 : 10">
                            <ui-select :readonly="readonly" :options="{
                                fields: {
                                    id: 'TD_FID',
                                    name: 'TD_FName',
                                    search: 'TD_FName',
                                },
                                label: '  واحد اصلی  ',
                                count: 10,
                            }" v-model="product.TGO_FID_Unit" :items="defaults[206]" />
                        </v-col>
                        <v-col cols="2">
                            <v-btn v-if="!readonly" @click="product.TGO_FID_Unit = null" icon class="mt-4">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>


                <v-col cols="3">
                    <v-row>
                        <v-col :cols="readonly ? 12 : 10">
                            <ui-select :readonly="readonly" :options="{
                                fields: {
                                    id: 'TD_FID',
                                    name: 'TD_FName',
                                    search: 'TD_FName',
                                },
                                label: '  واحد فرعی  ',
                                count: 10,
                            }" v-model="product.TGO_FID_Unit2" :items="defaults[206]" />
                        </v-col>
                        <v-col cols="2">
                            <v-btn v-if="!readonly" @click="product.TGO_FID_Unit2 = null" icon class="mt-4">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>

                <v-col cols="3">
                    <ui-input-money type="money" class="form_control_textInput" label="  تعداد در واحد فرعی  "
                        placeholder=" " :readonly="readonly" v-model="product.TGO_FCountINUnit" />
                </v-col>

                <v-col cols="3">
                    <v-row>
                        <v-col :cols="readonly ? 12 : 10">
                            <ui-select :readonly="readonly" :options="{
                                fields: {
                                    id: 'TGB_FID',
                                    name: 'TGB_FName',
                                    search: 'TGB_FName',
                                },
                                label: '   بسته بندی  ',
                                count: 10,
                            }" v-model="product.TGO_FID_TypeBox" :items="defaults.box" />
                        </v-col>
                        <v-col cols="2">
                            <v-btn v-if="!readonly" @click="product.TGO_FID_TypeBox = null" icon class="mt-4">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>

                <v-col cols="3">
                    <ui-input-money type="money" class="form_control_textInput" label=" تعداد در بسته بندی  "
                        placeholder=" " :readonly="readonly" v-model="product.TGO_FCountINBox" />
                </v-col>

                <v-col cols="3">
                    <ui-input-money type="money" class="form_control_textInput" label="  زمان تولید (روز)  "
                        :readonly="readonly" v-model="product.TGO_FProductionTime" />
                </v-col>

                <v-col cols="3">
                    <ui-input-money type="money" class="form_control_textInput" label="  درصد تخفیف فروش ویژه  "
                        :readonly="readonly" v-model="product.TGO_FSaleOff" />
                </v-col>

                <v-col cols="3">
                    <ui-input-money type="money" class="form_control_textInput" label="  درصد تخفیف همکار  "
                        :readonly="readonly" v-model="product.TGO_FBuyOff" />
                </v-col>

                <v-col cols="3">
                    <ui-input-money type="money" class="form_control_textInput" label="  درصد تخفیف نماینده  "
                        :readonly="readonly" v-model="product.TGO_FBuyPoint" />
                </v-col>

                <v-col cols="3">
                    <ui-input-money type="money" class="form_control_textInput" label=" تعداد فرم عمومی "
                        :readonly="readonly" v-model="product.TGO_FCount" />
                </v-col>

                <v-col cols="3">
                    <ui-input-money type="money" class="form_control_textInput" label="  تعداد فایل طراحی   "
                        :readonly="readonly" v-model="product.TGO_FBorder" />
                </v-col>
                <v-col cols="3">
                    <ui-input-money type="money" class="form_control_textInput" label=" عرض فایل (CM)" placeholder=" "
                        :readonly="readonly" v-model="product.TGO_FWidth" />
                </v-col>
                <v-col cols="3">
                    <ui-input-money type="money" class="form_control_textInput" label=" ارتفاع فایل (CM)" placeholder=" "
                        :readonly="readonly" v-model="product.TGO_FLength" />
                </v-col>

                <v-col v-if="selectiveAmount" cols="3">
                    <ui-input type="text" class="form_control_textInput" label=" تیراژ پیشفرض " :readonly="readonly"
                        v-model="product.TGO_FNumberDefault" />
                </v-col>
                <v-col v-if="selectiveAmount" cols="3">
                    <ui-input type="text" class="form_control_textInput" label=" حداقل تیراژ " :readonly="readonly"
                        v-model="product.TGO_FNumberStep" />
                </v-col>
                <v-col v-if="selectiveAmount" cols="3">
                    <ui-input-money type="money" class="form_control_textInput" label="  حداکثر تیراژ  "
                        :readonly="readonly" v-model="product.TGO_FNumberMax" />
                </v-col>

                <v-col cols="3">
                    <label>کد محصول</label>
                    <v-text-field flat rounded solo class="form_control_textInput" label="کد محصول" type="number"
                        :disabled="readonly" :error-messages="FCodeErrors" v-model="product.TGO_FCode"
                        @input=FCodeValidation() />
                </v-col>

            </v-row>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
import goodsMixin from '../../../goods/_mixins/goodsMixin';

export default {
    props: ["salePage", "product", "defaults", "readonly"],
    mixins: [goodsMixin],

    data() {
        return {
            selectiveAmount: false,
            selectedCategoryTitle: "",
            selectedTypeTitle: "",
            FCodeErrors: [],
        }
    },
    mounted() {
        this.selectedCategoryTitle = this.return_selectedCategoryTitle();
        this.selectedTypeTitle = this.return_selectedTypeTitle();
        if (this.product.TGO_FID_NumberType == 27002) {
            this.selectiveAmount = false;
        }
        else if (this.product.TGO_FID_NumberType == 27001) {
            this.selectiveAmount = true;
        }
    },
    methods: {
        category1Changed(value) {
            this.$refs.categoryDialog.isActive = false;
            if (value.length > 0) {
                this.product.TGO_FID_Category1 = value[0].TD_FID;
                this.selectedCategoryTitle = value[0].TD_FName;
            }
            else {
                this.product.TGO_FID_Category1 = 0;
                this.selectedCategoryTitle = "";
            }
        },
        typeChanged(value) {
            this.$refs.typeDialog.isActive = false;
            if (value.length > 0) {
                this.product.TGO_FID_Type = value[0].TD_FID;
                this.selectedTypeTitle = value[0].TD_FName;
            }
            else {
                this.product.TGO_FID_Type = 0;
                this.selectedTypeTitle = "";
            }
        },
        return_selectedCategoryTitle() {
            var ret = null;
            if (this.product.TGO_FID_Category1) {
                const def1 = this.defaults[272].find(d => d.TD_FID == this.product.TGO_FID_Category1);
                if (def1)
                    return def1.TD_FName;

                this.defaults[272].forEach(d => {
                    if (d.children) {
                        const child = d.children.find(d => d.TD_FID == this.product.TGO_FID_Category1);
                        if (child)
                            ret = d.TD_FName + ' > ' + child.TD_FName;
                    }
                });
            }
            return ret;
        },
        return_selectedTypeTitle() {
            var ret = null;
            if (this.product.TGO_FID_Type) {
                const def1 = this.defaults[207].find(d => d.TD_FID == this.product.TGO_FID_Type);
                if (def1)
                    return def1.TD_FName;
                this.defaults[207].forEach(d => {
                    if (d.children) {
                        const child = d.children.find(d => d.TD_FID == this.product.TGO_FID_Type);
                        if (child)
                            ret = d.TD_FName + ' > ' + child.TD_FName;
                    }
                });
            }
            return ret;
        },

        async FCodeValidation() {
            this.FCodeErrors = []
            this.$emit('errorUpdate', false)
            if (this.product && this.product.TGO_FCode > 0) {
                const FID = await this.TGO_FCode2TGO_FID(this.product.TGO_FCode)

                if (FID && FID.TGO_FID) {
                    if (FID.TGO_FID != this.product.TGO_FID) {
                        this.$emit('errorUpdate', true)
                        this.FCodeErrors = ['کد کالا/محصول تکراری میباشد']
                    }
                }
            }
        },
    },
}
</script>