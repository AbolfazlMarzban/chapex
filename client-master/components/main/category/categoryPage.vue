<template>
  <div>
    <v-row>
        <v-col cols="12">
            <CategorySlider v-if="gallery && gallery.length > 0" :gallery="gallery" class="mt-15"/>
            <CategoryProducts :category="data" class="mt-15"/>
            <category-faq class="mt-15" :data="faq"/>
        </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
    props: ["categoryFLink"],
    data() {
        return {
            data: {},
            gallery: [],
            faq: []
        };
    },
    mounted() { 
        this.getCategory();
    },
    methods: {
        async getCategory() {
            try {
                const result = await this.$authAxios.$get(`/defaults/getCategoryFLink/${this.categoryFLink}`);
                if (result) {
                    console.log("categoryFlink", result);
                    this.data = result.form[0];
                    this.gallery = result.gallery;
                    this.faq = result.faq;
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    },
}
</script>

<style>


</style>