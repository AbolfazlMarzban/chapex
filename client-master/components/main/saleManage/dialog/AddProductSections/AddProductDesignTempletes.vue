<template>
    <v-expansion-panel class="togglebox">
        <accordian-title title="قالب طراحی" :unsaved="false" />
        <v-expansion-panel-content>
            <v-row>
                <v-col cols="3">
                    <ui-file-uploader state="productPdf" :readonly="readonly" placeholder="Adobe PDF (*.pdf)" accept="pdf"
                        :value="{ path: product.TGO_FPicAdd1 }" @input="(value) => product.TGO_FPicAdd1 = value.path">
                    </ui-file-uploader>
                </v-col>

                <v-col cols="3">
                    <ui-file-uploader state="productCDR" :readonly="readonly" placeholder="CorelDraw (*.cdr)" accept="cdr"
                        :value="{ path: product.TGO_FPicAdd2 }" @input="(value) => product.TGO_FPicAdd2 = value.path">
                    </ui-file-uploader>
                </v-col>

                <v-col cols="3">
                    <ui-file-uploader state="productAi" :readonly="readonly" placeholder="Illustrator (*.ai)" accept="ai"
                        :value="{ path: product.TGO_FPicAdd3 }" @input="(value) => product.TGO_FPicAdd3 = value.path">
                    </ui-file-uploader>
                </v-col>

                <v-col cols="3">
                    <ui-file-uploader state="productPsd" :readonly="readonly" placeholder="Photoshop (*.psd)" accept="psd"
                        :value="{ path: product.TGO_FPicAdd4 }" @input="(value) => product.TGO_FPicAdd4 = value.path">
                    </ui-file-uploader>
                </v-col>
            </v-row>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>

export default {
    props: ["readonly", "product"]
}
</script>