<template>
    <v-expansion-panel>
        <accordian-title title="گالری تصاویر" :unsaved="sections_changed()" :readonly="readonly" />

        <v-expansion-panel-content>
            <ui-gallery :state="2400101" :FID_Parent="data.TPS_FID" :gallery="data.gallery"
                :indexImage="data.TPS_FID_IndexImage" @setIndexImage="setIndexImage" :readonly="readonly"></ui-gallery>
        </v-expansion-panel-content>

    </v-expansion-panel>
</template>
  
<script> 
export default {
    props: ["data", "defaults", "readonly", "wizardView", "lastsaved_data"],
    data() {
        return {
            pictureOptions: {
                idForm: this.data.TPS_FID,
                type: "JPG", 
                form: "pageSale",
            },

            showUploadDialog: false,
        };
    },
    mounted() {
        // console.log('gallery', this.data.gallery)
    },
    methods: {
        setIndexImage(image_FID) {
            this.data.TPS_FID_IndexImage = image_FID
        },

        sections_changed() {

            var local_data = JSON.parse(JSON.stringify(this.data))
            var obj1 = local_data.gallery.filter(p => p.TPIC_FForm == 'pageSale')

            var local_lastsaved_data = JSON.parse(JSON.stringify(this.lastsaved_data))
            var obj2 = local_lastsaved_data.gallery.filter(p => p.TPIC_FForm == 'pageSale')

            return !(JSON.stringify(obj1) === JSON.stringify(obj2))
        },
    },
};
</script>