<template>
    <div v-if="myData" class="py-5">
        <v-img v-if="formImage.length > 0" :src="setImageUrl(formImage)" class="img-head">

        </v-img>
        <v-card v-if="myData.data.TF_FComment && myData.data.TF_FTitle" class="pa-5 my-5">
            <v-card-title>
                <h1 class="h1-title">{{ myData.data.TF_FTitle }}</h1>
            </v-card-title>
            <hr>
            <v-card-text v-if="myData.data.TF_FComment">
                <v-row>
                    <div v-html="myData.data.TF_FComment" style="color: black;">
                    </div>
                </v-row>
            </v-card-text>
        </v-card>

        <v-card class="pa-xl-5 pa-lg-5 pa-md-5">

            <v-card-text class="pa-0">
                <v-row>
                    <h1 class="h1-title" v-if="!myData.data.TF_FComment && myData.data.TF_FTitle">
                        {{ myData.data.TF_FTitle }}
                    </h1>

                    <template v-for="element in myData.fields">
                        <v-col cols="12" :xl="element.TFF_FColumn" :lg="element.TFF_FColumn" :md="element.TFF_FColumn"
                            v-if="element.TFF_FDelete == 0" :key="element.TFF_FID">
                            <FormField :readonly="readonly" :element="element" @toUseComponent="getvalue"
                                :deleteForm="deleteForm"></FormField>
                        </v-col>

                    </template>
                    <v-col cols="12" xl="12" lg="12" md="12" v-if="myData.data.TF_FActive">
                        <v-btn rounded class="delFormInfo ml-2" @click="deleteFieldsData">
                            <v-icon>mdi-delete-outline</v-icon>
                            پاک کردن اطلاعات فرم
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <v-card class="pa-4 my-5" v-if="myData.data.TF_FActive">

            <v-card-text class="pa-0">
                <v-container>
                    <v-row class="align-center">

                        <v-col cols="12" xl="7" lg="12" md="12" class="pl-0 d-flex align-center">
                            <v-icon>mdi-shield-alert-outline</v-icon>
                            <span v-if="myData.data.TF_FCaption.length > 0">{{ myData.data.TF_FCaption }}</span>
                            <span v-else>قبل از ارسال اطلاعات خود را تأیید نمائید</span>
                            <v-checkbox v-if="myData.data.TF_FCenter == 1" class="mr-2" label="تایید اطلاعات"
                                v-model="confirmation"></v-checkbox>
                        </v-col>

                        <v-col cols="12" xl="5" lg="12" md="12"
                            class="d-flex flex-wrap flex-row-reverse justify-center justify-xl-start justify-lg-start justify-md-start formBtnBox px-0">

                            <v-btn @click="saveResult" class="saveFormBtn" color="#016670" dark>
                                ارسال فرم
                            </v-btn>
                            <v-btn @click="cancelForm" class="cancelForm">
                                انصراف
                            </v-btn>
                        </v-col>

                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
        <form-cancel :showDialog="showCancel" @hiddenDialog="showCancel = false"
            @cancelProcessDialog="$router.go(-1)"></form-cancel>
    </div>
</template>

<script>
import formBuilderMixins from "./_mixins/formBuilderMixin";
import path from 'path'
export default {
    props: ["FID", "formBuilderData", "readonly", "value", "order", "fLink", "path", "orderID"],
    mixins: [formBuilderMixins],

    data() {
        return {
            myData: this.formBuilderData,
            fields: [],
            // img: 'https://s2.uupload.ir/files/unnamed_(2)_1_(1)_jhmi.png',
            deleteForm: false,
            formImage: '',
            confirmation: false,
            showCancel: false
        }
    },

    async mounted() {
        if (this.FID) {
            try {
                console.log('fid', this.FID)
                const result = await this.getUserForm(this.FID);
                const result2 = await this.getShow(this.FID);
                // console.log("result", result);
                // console.log('result2', result2); 

                if (result) {
                    this.myData = { data: result.data.form, fields: result2.formFields };
                    this.fields = result.fields;
                    // console.log("mydata", this.myData)
                    this.formImage = path.normalize(this.myData.data.TF_FPic)
                }
                if (result2) {
                    this.fields = result2.fields;
                }
            } catch (error) {
                console.log(error);
            }
        } else if (this.path) {
            try {
                const res = await this.$authAxios.$post(`formbuilder/getbylink`, { data: this.path })
                // console.log('res', res)
                if (res) {
                    this.myData = { data: res.form, fields: res.formFields }
                } else {
                    $nuxt.error({ statusCode: 404, message: 'Page not found' })
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
    methods: {
        deleteFieldsData() {
            this.deleteForm = !this.deleteForm
            this.myData.fields.forEach(item => {
                if (item.value) {
                    item.value = {}
                }
            })
        },
        cancelForm() {
            // this.$emit('cancelForm')
            this.showCancel = true
        },
        saveResult() {
            // for (var i = 0; i < this.myData.fields.length; i++) {
            //     console.log('fieldValue', this.myData.fields[i]);
            // }
            this.saveForm(this.myData.fields, "insert")
        },
        getvalue(element, value) {
            for (var i = 0; i < this.myData.fields.length; i++) {
                if (this.myData.fields[i] === element) {
                    this.myData.fields[i].value = value;
                    // console.log("result",this.myData.fields[i]);
                }
            }
        },
        async saveForm(data, mode) {
            try {
                if (this.orderID) {
                    data.forEach(item => item.orderID = this.orderID)
                }
                let result = await this.$authAxios.$post(`formBuilder/insertAndUpdateData?mode=${mode}`, {
                    data,
                })
                if (result) {
                    this.showResponseSuccessMessages(result);
                    setTimeout(() => {
                        this.$emit('formSaved')
                    }, 3000);
                    return result;
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style
  lang="scss"
  src="../../../assets/style/formBuilder/form.scss"
  scoped
></style>

<style lang="scss" >
.h1-title {
    border-bottom: none !important;
    font-weight: 900;
    font-size: 20px !important;
    line-height: 30px;
    text-align: center;
    width: 100%;
}

.v-card__title {
    padding: 0 !important;
    margin: 0 0 -15px !important;
}

.mx-auto {
    p {
        text-align: justify;
        font-weight: 400;
        font-size: 16px !important;
        line-height: 25px;
        text-align: right;
    }

    h3 {
        border-bottom: none !important;
        font-weight: 900;
        font-size: 16px !important;
        line-height: 25px;
    }

}

.v-card__text {
    padding-top: 0;
}

// .v-sheet {
//     border-radius: 20px !important;
// }

.img-head {
    border-radius: 20px;

    .v-image__image--cover {
        background-size: contain;
    }
}

.delFormInfo {
    span {
        font-size: 14px;
        letter-spacing: normal;
    }
}

.cancelForm {
    color: #8C8C8C;
    margin-left: 10px;
    float: left;
    width: 150px;
    height: 40px;
    background: white;
    border-radius: 20px;
    border: 1px solid grey;
}

.saveFormBtn {
    // color:#fff;
    float: left;
    width: 150px;
    height: 40px;
    // background: #016670;
    border-radius: 20px;
}

@media only screen and (max-width:600px) {
    .formBtnBox {
        .saveFormBtn {
            width: 100px;
            min-width: 100px;
            margin-top: 15px;

        }

        .cancelForm {
            width: 100px;
            min-width: 100px;
            margin-top: 15px;

        }

        .delFormInfo {
            margin-top: 15px;
        }
    }
}
</style>
