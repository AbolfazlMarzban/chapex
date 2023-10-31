<template>
    <v-tab-item>
        <v-card flat v-if="salePageStatus">
            <v-card-text class="px-xl-8 px-lg-8 px-md-8 px-sm-8 px-2 py-2">
                <DesignFiles />

                <div v-html="salePageStatus.salePage.TPS_FDesign" id="tempGuideTxt" class="temp-guide-txt pt-7"
                    :class="readMore ? 'expanded' : 'colapsed'"></div>

                <LoadMoreBtn v-if="!readMore" @readMore="readMore = true" />
            </v-card-text>
        </v-card>
    </v-tab-item>
</template>

<script>
import DesignFiles from './DesignFiles.vue';
import LoadMoreBtn from './LoadMoreBtn.vue';

export default {
    inject: ["salePageStatus"],
    data() {
        return {
            readMore: false
        }
    },
    components: { LoadMoreBtn, DesignFiles }
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