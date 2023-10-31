<template>
    <v-card color="purple lighten-5">
        <v-card-title></v-card-title>

        <v-card-text>

            <v-row class="px-3 mb-4">

                <v-col v-if="!readonly" cols="4">
                    <v-card style="height:150px">
                        <v-card-title class="pa-0 ma-0 mb-2">
                            <v-chip color="white" class=" mt-n3">افزودن مقدار خصوصیت</v-chip>
                        </v-card-title>
                        <v-card-text>
                            <v-text-field flat rounded label="نام خصوصیت" @keyup.enter="addChild" class="pt-0 mt-0"
                                v-model="TD_FName" :readonly="readonly" prepend-inner-icon="mdi-plus"></v-text-field>
                            <span class="float-left"><label>پس از ورود Enter بزنید</label></span>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="4">
                    <v-card style="height:250px">
                        <v-card-title class="pa-0 ma-0 mb-2">
                            <v-chip color="white" class=" mt-n3">نمایش خصوصیت</v-chip>
                        </v-card-title>
                        <v-card-text class="pa-1">
                            <v-row>
                                <v-col cols="12">
                                    <v-select label="استایل نمایش" flat outlined rounded
                                        v-model.lazy="option.TD_FUserViewType" :items="defaults[211]" item-text="TD_FName"
                                        item-value="TD_FID" class="comboBox" :disabled="readonly">
                                    </v-select>
                                </v-col>
                                <v-col cols="12">
                                    <v-select label="شرط نمایش" flat outlined rounded v-model.lazy="option.TD_FActionToDeps"
                                        :items="defaults[231]" item-text="TD_FName" item-value="TD_FID" class="comboBox"
                                        :disabled="readonly">
                                    </v-select>
                                </v-col>
                            </v-row>


                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="4" v-if="option.TD_FActionToDeps != 23102">
                    <v-card style="height:250px">
                        <v-card-title class="pa-0 ma-0 mb-2">
                            <v-chip color="white" class="mt-n3">شرایط نمایش</v-chip>
                        </v-card-title>
                        <v-card-text class="pa-1">
                            <v-row class="pa-0 ma-0 mt-2">
                                <v-col cols="12" class="pa-0 ma-0">
                                    <v-switch dense label="نمایش با انتخاب هر وابستگی" v-model="option.TD_FFormType"
                                        :true-value="1" :false-value="0" :disabled="readonly" class="pa-0 ma-0"></v-switch>
                                </v-col>
                                <v-col cols="12" class="pa-0 ma-0">
                                    <v-switch dense label="نمایش با انتخاب تمام وابستگی ها" v-model="option.TD_FFormTypeAll"
                                        :true-value="1" :false-value="0" :disabled="readonly" class="pa-0 ma-0"></v-switch>
                                </v-col>
                                <v-col cols="12" class="pa-0 ma-0">
                                    <v-switch dense label="نمایش در حالت پیشفرض (BackgroundSet)"
                                        v-model="option.TD_ActionToBgSet" :true-value="0" :false-value="1"
                                        :disabled="readonly" class="pa-0 ma-0"></v-switch>
                                </v-col>
                                <v-col cols="12" class="pa-0 ma-0">
                                    <v-switch dense label="نمایش در حالت تک گزینه ای (AloneSet)"
                                        v-model="option.TD_FHideOnAloneSet" :true-value="0" :false-value="1"
                                        :disabled="readonly" class="pa-0 ma-0"></v-switch>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>

            </v-row>

            <v-data-table class="elevation-1 mx-3" :headers="readonly ? childrenHeadersReadOnly : childrenHeaders"
                :items="getOptionValues(salePage, option.TD_FID)" :item-key="get_keyItem()" :sort-by.sync="childrenSortBy">

                <template v-slot:item.TD_FOrder="{ item }">
                    <UpDownButtons v-if="item.TD_FDelete == 0" :items="getOptionValues(salePage, option.TD_FID)"
                        :item="item" FieldName="TD_FOrder" :readonly="readonly">
                    </UpDownButtons>
                </template>

                <template v-slot:item.TD_FActive="{ item }">
                    <span v-if="item.TD_FDelete == 0">
                        <v-switch v-if="!readonly" v-model="item.TD_FActive" :true-value="1" :false-value="0"
                            inset></v-switch>
                        <v-icon v-else-if="item.TD_FActive" color="green" size="36">mdi-check</v-icon>
                    </span>
                </template>

                <template v-slot:item.TD_FDefault="{ item }">
                    <span v-if="item.TD_FDelete == 0">
                        <v-switch v-if="!readonly" v-model="item.TD_FDefault" :true-value="1" :false-value="0"
                            @change="defaultOptionChanged(item)" inset></v-switch>
                        <v-icon v-else-if="item.TD_FDefault" color="green" size="36">mdi-crosshairs-gps</v-icon>
                    </span>
                </template>

                <template v-slot:item.delete="{ item }">
                    <DeleteButton v-if="!readonly" :items="getOptionValues(salePage, option.TD_FID)" :item="item"
                        :salePage="salePage" state="optionValue"></DeleteButton>
                </template>

                <template v-slot:item.TD_FName="props">
                    <v-edit-dialog v-if="props.item.TD_FDelete == 0 && !readonly" :return-value.sync="props.item.TD_FName">
                        <span class="selectiveOption">{{ props.item.TD_FName }}</span>
                        <template v-slot:input>
                            <v-text-field v-model="props.item.TD_FName" label="Edit" single-line counter>
                            </v-text-field>
                        </template>
                    </v-edit-dialog>
                    <span v-else-if="readonly">
                        <span class="selectiveOption">{{ props.item.TD_FName }}</span>
                        <v-chip v-if="props.item.TD_FDefault == 1" color="success">پیشفرض</v-chip>
                    </span>
                    <span v-else class="font-italic text-decoration-line-through">{{ props.item.TD_FName }}</span>

                </template>

                <template v-slot:item.addRel="props">
                    <v-edit-dialog v-if="props.item.TD_FDelete == 0 && !readonly" :return-value.sync="newRel">
                        <v-btn icon color="teal darken-4">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                        <template v-slot:input>
                            <span>افزودن وابستگی</span>
                            <v-treeview selectable :items="treeItems" item-key="id" v-model="props.item.dependecy">
                            </v-treeview>
                        </template>
                    </v-edit-dialog>
                </template>

                <template v-slot:item.dependecy="{ item }">
                    <v-chip v-if="item.TD_FDelete == 0" class="pa-1 px-2 ma-1 text-caption"
                        v-for="(dep, i) in item.dependecy" :key="i">
                        <span v-if="getDependecyName(dep)">{{ getDependecyName(dep) }}</span>
                        <span v-else>
                            <v-icon color="red">mdi-alert-circle</v-icon>
                        </span>
                        <ChipDeleteButton v-if="!readonly" :items="item.dependecy" :item="dep" :deleteFromList="true"
                            :salePage="salePage" state="optionValue">
                        </ChipDeleteButton>
                    </v-chip>
                </template>


            </v-data-table>

        </v-card-text>
    </v-card>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import OptionImageUploader from "./OptionImageUploader.vue";
import saleManageMixin from "../../_mixins/saleManageMixin";
import saleDataMixin from "../../../sale/_mixins/saleDataMixin";

export default {
    props: ["salePage", "option", "defaults", "readonly"],
    mixins: [saleManageMixin, saleDataMixin],
    data() {
        return {
            childrenHeaders: [
                {
                    text: "ترتیب",
                    align: "center",
                    sortable: false,
                    value: "TD_FOrder",
                    width: "10%"
                },
                {
                    text: "فعال",
                    align: "center",
                    sortable: false,
                    value: "TD_FActive",
                    width: "5%"
                },
                {
                    text: "پیشفرض",
                    align: "right",
                    sortable: false,
                    value: "TD_FDefault",
                    width: "5%"
                },
                {
                    text: "مقدار",
                    align: "right",
                    sortable: false,
                    value: "TD_FName",
                    width: "15%"
                },
                {
                    text: "ایجاد وابستگی",
                    align: "right",
                    sortable: false,
                    value: "addRel",
                    width: "5%"
                },
                {
                    text: "وابستگی ها",
                    align: "right",
                    sortable: false,
                    value: "dependecy",
                    width: "55%"
                },
                {
                    text: "حذف",
                    align: "center",
                    sortable: false,
                    value: "delete",
                    width: "5%"
                },
            ],
            childrenHeadersReadOnly: [
                {
                    text: "فعال",
                    align: "center",
                    sortable: false,
                    value: "TD_FActive",
                    width: "5%"
                },
                {
                    text: "مقدار",
                    align: "right",
                    sortable: false,
                    value: "TD_FName",
                    width: "30%"
                },
                {
                    text: "وابستگی ها",
                    align: "right",
                    sortable: false,
                    value: "dependecy",
                    width: "60%"
                },
                {
                    text: "",
                    align: "center",
                    sortable: false,
                    value: "trim",
                    width: "5%"
                },
            ],
            childrenSortBy: "TD_FOrder",
            TD_FName: "",
            newRel: "",
            tree: [],
            treeItems: [],
            myData: this.salePage.options,
        };
    },
    mounted() {
        this.assignTreeView();
    },
    methods: {
        addChild() {
            this.salePage.optionsValues.push({
                TD_FID: uuidv4(),
                isNew: true,
                newlyAdded: true,
                TD_FID_Group: this.option.TD_FID,
                TD_FName: this.TD_FName,
                TD_FCaption: "",
                TD_FActive: 1,
                TD_FDelete: 0,
                TD_FOrder: this.getOptionValues(this.salePage, this.option.TD_FID).length,
            });
            this.TD_FName = "";
        },
        getDependecyName(id) {
            var ret = "";

            const option = this.getOptionForValue(this.salePage, id)
            this.salePage.optionsValues.forEach(child => {
                if (child.TD_FID == id) {
                    ret = option.TD_FName + " > " + child.TD_FName;
                }
            });
            return ret;
        },
        assignTreeView() {
            // this.treeItems = []
            this.salePage.options.forEach(option => {
                var obj = {
                    id: option.TD_FID,
                    name: option.TD_FName,
                    children: []
                };
                this.treeItems.push(obj);
                this.getOptionValues(this.salePage, option.TD_FID).forEach(child => {
                    var obj1 = {
                        id: child.TD_FID,
                        name: child.TD_FName,
                    };
                    obj.children.push(obj1);
                });
            });
            // console.log('this.treeItems', this.treeItems);
        },
        get_keyItem() {
            return "TD_FID";
            // if (this.salePage.options.length > 0 && this.salePage.options[0].TD_FID) {
            // }
            // else {
            //     return "tempid";
            // }
        },
        defaultOptionChanged(child) {
            if (child.TD_FDefault) {
                this.getOptionValues(this.salePage, this.option.TD_FID).filter(c => !(c.TD_FID == child.TD_FID)).forEach(p => {
                    p.TD_FDefault = 0
                });
            }
        },
    },
    components: { OptionImageUploader }
}
</script>

<style>
.selectiveOption {
    color: #016670;
    font-family: boldbakhtiari !important;
    font-size: 24px;
}

.comboBox {
    background: none !important;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    /* border: 1px solid #D9D9D9; */
    margin-top: -6px !important;

    .v-text-field__details {
        display: none;
    }

    .v-input__slot {
        min-height: 40px !important;
        height: 0px;
        margin-bottom: 0px;
    }

    .v-input__control {
        min-height: 40px !important;
    }

    fieldset {
        height: 40px;
        border: none !important;
    }
}

div.v-select__selections>input {
    /* display: none !important; */
}
</style>