<template>
    <v-tab-item>
        <v-card flat v-if="salePageStatus">
            <v-card-text class="pa-5">
                <div v-html="salePageStatus.salePage.TPS_FIntroduction" class="intro-txt" id="introTxt"
                    :class="readMore ? 'expanded' : 'colapsed'"></div>

                <LoadMoreBtn v-if="!readMore" @readMore="readMore = true" />
            </v-card-text>
        </v-card>
    </v-tab-item>
</template>

<script>
import LoadMoreBtn from './LoadMoreBtn.vue';

export default {
    inject: ["salePageStatus"],
    data() {
        return {
            readMore: false
        };
    },
    components: { LoadMoreBtn }
}
</script>

<style scoped>

.colapsed {
    max-height: 700px;
    overflow: hidden;
    z-index: 900;
}

.expanded {}
</style>