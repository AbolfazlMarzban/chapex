<template>
    <div>
        <library-dialog @export="setImages" :multiple="true" :isAdmin="isAdmin" :selected="files" class="ms-auto" />

    </div>
</template>

<script>

export default {
    props: ["items", "state", "FID_Parent", "readonly"],

    data() {
        return {
            files: [],
        }
    },

    mounted() {
        this.files = this.items.filter(
            p => p.TPU_FID_State == this.state && p.TPIC_FID_Parent == this.FID_Parent
        );
    },

    methods: {
        setImages(images) {
            for (var i = 0; i < images.length; i++) {
                var img = {
                    TPIC_FID: images[i].TPIC_FID,
                    TPIC_FName: images[i].TPIC_FName,
                    alt: images[i].TPIC_FCommnet,
                    path: images[i].TPIC_FAddress,
                    thumbnail_path: images[i].thumbnail,
                    TPIC_FDelete: 0,
                    TPU_FID_State: this.state,
                    isnew: true
                };
                if (this.files.findIndex(item => item.TPIC_FID == images[i].TPIC_FID) == -1) {
                    this.files.push(img);
                    this.items.push(img);
                }
            }

            // console.log('this.salePage.gallery', this.salePage.gallery);
        },
    }
}
</script>