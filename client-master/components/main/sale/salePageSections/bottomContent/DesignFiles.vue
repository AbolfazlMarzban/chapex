<template>
    <v-row class="pt-3">
        <v-col cols="12" class="iconbox mt-2 direction-rtl">
            <span class="temp-guid">جهت طراحی سفارش خود ابتدا قالب گرافیکی محصول انتخاب شده </span>
            <span class="temp-guid-product-name">{{ salePageStatus.salePage.TPS_FTitle }}</span>
            <span class="temp-guid-product-name">{{ salePageStatus.finalProduct.TGO_FName }}</span>
            <span class="temp-guid"> را از این قسمت دانلود کنید.</span>

            <v-row v-for="option in options" class="justify-center align-center pb-xl-0 pb-lg-0 pb-md-0 pb-5">

                <v-col cols="12" class="mt-5 mb-0">
                    <span class="optionValueTitle">قالب طراحی </span>
                    <span class="optionTitle">{{ option.optionTitle }}</span>
                    <!-- <span class="optionValueTitle">{{ option.title }}</span> -->
                </v-col>

                <v-col v-for="file in option.files"
                    class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 py-0 px-md-1 d-inline-grid templateBox">
                    <a :href="file.path" class="pdf-temp">

                        <v-row v-if="file.fileType == 'pdf'" class="align-center justify-space-between">
                            <v-col cols="6" class="temptxt"><label>PDF</label>
                                <p>Template</p>
                            </v-col>
                            <v-col cols="6" class="imgbox">
                                <img src="~/assets/img/format icon/pdf.png" alt="pdf icon" />
                            </v-col>
                        </v-row>

                        <v-row v-else-if="file.fileType == 'cdr'" class="align-center justify-space-between">
                            <v-col cols="6" class="temptxt"><label>Coreldraw</label>
                                <p>Template</p>
                            </v-col>
                            <v-col cols="6" class="imgbox">
                                <img src="~/assets/img/format icon/cdr.png" alt="coreldraw icon" />
                            </v-col>
                        </v-row>

                        <v-row v-else-if="file.fileType == 'ai'" class="align-center justify-space-between" cols="12">
                            <v-col cols="6" class="temptxt"><label>illustrator</label>
                                <p>Template</p>
                            </v-col>
                            <v-col cols="6" class="imgbox">
                                <img src="~/assets/img/format icon/ai.png" alt="Illustrator icon" />
                            </v-col>
                        </v-row>

                        <v-row v-else-if="file.fileType == 'psd'" class="align-center justify-space-between">
                            <v-col cols="6" class="temptxt"><label>Photoshop</label>
                                <p>Template</p>
                            </v-col>
                            <v-col cols="6" class="imgbox">
                                <img src="~/assets/img/format icon/psd.png" alt="photoshop icon" />
                            </v-col>
                        </v-row>

                    </a>
                </v-col>

            </v-row>
        </v-col>
    </v-row>
</template>

<script>

export default {
    inject: ["salePageStatus", "optionsValues"],

    data() {
        return {
            options: [],
        }
    },

    mounted() {
        this.setFiles()
    },

    methods: {
        setFiles() {
            if (this.salePageStatus.finalProduct) {
                this.options = []
                this.optionsValues.filter(ov => ov.isSelected).forEach(selectedChild => {
                    const productsOptionValue = this.salePageStatus.salePage.productsOptionValue.filter(pov => pov.TGPV_FID_Value == selectedChild.TD_FID && pov.TGPV_FID_Product == this.salePageStatus.finalProduct.TGO_FID)
                    productsOptionValue.forEach(pov => {
                        const files = this.salePageStatus.salePage.gallery.filter(p => p.TPU_FID_State == 2400301 && p.TPU_FID_Parent == pov.TGPV_FID)

                        files.forEach(f => {
                            f.fileType = 'image'
                            if (f.path.toLowerCase().endsWith('.psd') || f.TPU_FShowName.toLowerCase().endsWith('.psd'))
                                f.fileType = 'psd'

                            if (f.path.toLowerCase().endsWith('.pdf') || f.TPU_FShowName.toLowerCase().endsWith('.pdf'))
                                f.fileType = 'pdf'

                            if (f.path.toLowerCase().endsWith('.zip') || f.TPU_FShowName.toLowerCase().endsWith('.zip'))
                                f.fileType = 'zip'

                            if (f.path.toLowerCase().endsWith('.rar') || f.TPU_FShowName.toLowerCase().endsWith('.rar'))
                                f.fileType = 'rar'

                            if (f.path.toLowerCase().endsWith('.cdr') || f.TPU_FShowName.toLowerCase().endsWith('.cdr'))
                                f.fileType = 'cdr'

                            if (f.path.toLowerCase().endsWith('.ai') || f.TPU_FShowName.toLowerCase().endsWith('.ai'))
                                f.fileType = 'ai'

                        })

                        if (files.length > 0) {
                            const option = this.salePageStatus.salePage.options.find(o => o.TD_FID == selectedChild.TD_FID_Group)
                            this.options.push({
                                id: pov.TGPV_FID,
                                optionTitle: option.TD_FName,
                                title: selectedChild.TD_FName,
                                files: files
                            })
                        }
                    })
                })
            }
        }
    },

    watch: {
        "salePageStatus.finalProduct": {
            handler(newValue, oldValue) {
                this.setFiles()
            },
            immediate: true
        },
    }
}
</script>

<style scoped>
.optionTitle {
    font-size: 20px;
}

.optionValueTitle {
    font-size: 20px;
}
</style>