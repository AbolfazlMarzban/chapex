<template>
    <v-expansion-panel class="togglebox"> 
        <accordian-title title="گالری تصاویر" :unsaved="false" />
        <v-expansion-panel-content>
            <ui-gallery :state="2400102" :FID_Parent="product.TGO_FID" :gallery="salePage.gallery"
                :indexImage="product.TGO_FID_IndexImage" @setIndexImage="setIndexImage" :readonly="readonly" />

        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>

export default {
    props: ["salePage", "product", "readonly"],
    methods: {
        setIndexImage(image_FID) {
            this.product.TGO_FID_IndexImage = image_FID;
        },
    },
}
</script>