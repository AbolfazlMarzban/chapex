<template>
    <div>
        <ui-header-manager :title="headerManager.title" :Buttons="headerManager.buttons" :status="headerManager.status"
            @submit="submit" @cancel="showDialog = true"></ui-header-manager>
        <CategoryCancel @cancelProcessDialog="cancelProcessDialog" @hiddenDialog="showDialog = false"
            :showDialog="showDialog" :data="data" />
        <v-card color="basil" flat v-if="data">
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" class="text-center">
                            <label style="font-size: 18px; font-weight: bold;">مدیریت محتوای صفحه ی دسته بندی {{
                                data.TD_FName }}</label>
                        </v-col>
                        <v-col cols="2">
                            <ui-input type="text" class="form_control_textInput" v-model="data.TD_FValue4"
                                label="عنوان (تگ تایتل)" placeholder=" " :readonly="readonly" />
                        </v-col>
                        <v-col cols="2">
                            <ui-input type="text" class="form_control_textInput" v-model="data.TD_FCaption" label="لینک"
                                placeholder=" " :readonly="readonly" />
                        </v-col>
                        <v-col cols="12">
                            <label style="font-size: 16px;">توضیحات صفحه ی دسته بندی</label>
                            <ui-editor v-model="data.TD_FComment"></ui-editor>
                        </v-col>
                        <v-col cols="12">
                            <label style="font-size: 16px;">تصاویر اسلایدر</label>
                            <ui-gallery state="salePageCategory" :FID_Parent="ID" :gallery="gallery"
                                :indexImage="indexImage" @setIndexImage="setIndexImage" :readonly="false"></ui-gallery>
                        </v-col>
                        <v-col cols="12">
                            <label style="font-size: 16px;">سوالات متداول</label>
                            <hr />
                            <v-row class="align-center" v-for="item, i in faqs" :key="i">
                                <v-col cols="6" class="d-flex align-center" >
                                    <v-btn icon @click="addQuestion">
                                        <v-icon color="green">mdi-plus-circle</v-icon>
                                    </v-btn>
                                    <v-btn icon @click="deleteQuestion(i)">
                                        <v-icon color="red">
                                            mdi-minus-circle
                                        </v-icon>
                                    </v-btn>
                                    <ui-input type="text" class="form_control_textInput" placeholder="سوال را وارد کنید"
                                        style="flex-grow: 1;" v-model="item.TFAQ_FQuestion"></ui-input>
                                </v-col>
                                <v-col cols="6">
                                    <v-textarea class="mt-2 faq-answer" rows="1" auto-grow row-height="15"
                                        label="پاسخ را وارد کنید" v-model="item.TFAQ_FAnswer"></v-textarea>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    props: ["ID"],
    data() {
        return {
            showDialog: false,
            headerManager: {
                show: true,
                status: "edit",
                title: {
                    fa: "مدیریت محتوای صفحات دسته بندی",
                    en: "manage salePage categories",
                    icon: "mdi-close"
                },
                buttons: {}
            },
            data: {},
            gallery: [],
            indexImage: '',
            faq: [
                {
                    TFAQ_FQuestion: '',
                    TFAQ_FAnswer: '',
                    TFAQ_FID: null,
                    TFAQ_FDELETE: 0
                }
            ],
            poop: []
        }
    },
    computed: {
        faqs: {
           get: function(){
            this.poop = this.faq.filter(i => {
                    var x = false
                    if(i.TFAQ_FDELETE){
                        if (i.TFAQ_FDELETE == 0) {
                        x = true
                    } 
                    } else {
                        i.TFAQ_FDELETE = 0
                        x = true
                    }
                    return x
                })
                    return this.poop
           },
           set: function(newValue){
            this.poop = newValue.filter(i => {
                    var x = false
                    if(i.TFAQ_FDELETE){
                        if (i.TFAQ_FDELETE == 0) {
                        x = true
                    } 
                    } else {
                        i.TFAQ_FDELETE = 0
                        x = true
                    }
                    return x
                })
           }   
        }
    },
    mounted() {
        if (this.ID) {
            this.getCatData();
        }
    },
    methods: {
        addQuestion() {
            this.faq.push({
                TFAQ_FQuestion: '',
                TFAQ_FAnswer: '',
                TFAQ_FID: null,
                TFAQ_FDELETE: 0
            })
        },
        deleteQuestion(i) {
            // this.faq.splice(i, 1)
            this.faq[i].TFAQ_FDELETE = 1
            this.faqs = this.faq
        },
        setIndexImage(image_FID) {
            this.indexImage = image_FID
        },
        async submit() {
            try {
                this.data.gallery = this.gallery
                for (var i = 0; i < this.faq.length; i++) {
                    if (!this.faq[i].TFAQ_FID) {
                        this.faq[i].TFAQ_FID = this.faq.indexOf(this.faq[i]) + 1
                    }
                }
                this.data.FAQ = this.faq
                // console.log('data', this.data)
                const res = await this.$authAxios.post("/defaults/salePageCategory", this.data)
                if (res) {
                    this.showResponseSuccessMessages(res.data);
                }
            } catch (error) {
                console.log(error)
            }
        },
        cancelProcessDialog() {
            this.$router.push("/admin/salePageCategory")
        },
        async getCatData() {
            try {
                // const result = await this.$authAxios.$get(`/defaults/get/${this.ID}?mode=show`)
                const result = await this.$authAxios.$get(`/defaults/getSalePageCategory/${this.ID}`)
                // console.log('result', result)

                if (result) {
                    console.log('result', result)
                    this.data = result.form
                    if (result.gallery) {
                        this.gallery = result.gallery
                    }
                    if (result.faq && result.faq.length > 0) {
                        this.faq = result.faq
                 
                    }
                    // console.log('data', this.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style lang="scss">
.faq-answer {
    input {
        border: none !important;
    }

    label {
        right: 20px !important;
        left: auto !important;
    }
}
</style>