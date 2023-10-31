<template>
    <v-row v-if="canShow">
        <v-col v-if="option.TD_FType == 21703" cols="12" class="pa-0 ma-0 mt-xl-12 mt-lg-12 mt-md-12 mt-10">
            <div class="d-flex align-start flex-lg-row flex-md-row flex-column">
                <OptionTitle :option="option" :lockClicked="lockClicked" />
            </div>

            <div class="d-flex flex-row flex-wrap mt-2">
                <ClassicSelector v-if="option.TD_FUserViewType == 21103" :option="option" />

                <ModernSelector v-else :option="option" />
            </div>
        </v-col>

        <v-col v-if="option.TD_FType == 21704 && salePageStatus.finalProduct" cols="12" class="pa-0 ma-0 mt-12">
            <DesignStatusSelector v-if="showDesignStatusSelector" :option="option" />
        </v-col>

    </v-row>
</template>


<script>
import userSaleMixin from '../../../_mixins/userSaleMixin';
import ClassicSelector from './ClassicSelector.vue';
import DesignStatusSelector from './DesignStatusSelector.vue';
import ModernSelector from './ModernSelector.vue';
import OptionTitle from './OptionTitle.vue';
import saleDataMixin from '../../../_mixins/saleDataMixin';
import designMixin from '../../../_mixins/designMixin';

export default {
    inject: ["salePageStatus"],
    props: ["option"],
    data() {
        return {
            hoverChild: null,
            lockClicked: null,
            canShow: true,
            showDesignStatusSelector: true,
        }
    },

    provide() {
        return {
            lockClick: this.lockClick,
            hideLockMemo: this.hideLockMemo,
        };
    },

    mounted() {
        this.setCanShow()
        this.setShowDesignStatusSelector()
    },

    methods: {

        lockClick(child) {
            if (this.lockClicked && this.lockClicked.TD_FID == child.TD_FID)
                this.lockClicked = null
            else
                this.lockClicked = child
        },

        hideLockMemo() {
            this.lockClicked = null
        },

        setCanShow() {

            if (this.option.TD_FActionToDeps == 23102) {//نمایش همیشگی
                this.canShow = true
                return
            }

            if (this.salePageStatus.state == 'backgroundSet') {
                if (this.option.TD_ActionToBgSet) {
                    this.canShow = false
                    return
                }
            }
            else {
                if (this.option.TD_FFormType == 1) {
                    if (!this.depSelected(this.salePageStatus.salePage, this.option)) {
                        this.canShow = false
                        return
                    }
                }

                if (this.option.TD_FFormTypeAll == 1) {
                    if (!this.allDepsSelected(this.salePageStatus.salePage, this.option)) {
                        this.canShow = false
                        return
                    }
                }

                if (this.option.TD_FHideOnAloneSet == 1) {
                    const activeItems = this.getActiveItems(this.salePageStatus.state, this.salePageStatus.salePage, this.option)
                    if (activeItems.length <= 1) {
                        this.canShow = false
                        return
                    }
                }

                if (this.option.TD_FActive == 0) {
                    this.canShow = false
                    return
                }
            }

            this.canShow = true
        },

        setShowDesignStatusSelector() {
            if (this.salePageStatus && this.salePageStatus.finalProduct)
                this.showDesignStatusSelector = this.productHasDesignOptionValue(this.salePageStatus.salePage, this.salePageStatus.finalProduct.TGO_FID)
        },
    },

    watch: {
        "salePageStatus.changed": {
            handler(newValue, oldValue) {
                if (this.option) {
                    this.setCanShow()
                    this.setShowDesignStatusSelector()
                    this.lockClicked = null
                }
            },
            immediate: true
        },
    },

    components: { ModernSelector, OptionTitle, ClassicSelector, DesignStatusSelector },
    mixins: [userSaleMixin, saleDataMixin, designMixin],

}
</script>