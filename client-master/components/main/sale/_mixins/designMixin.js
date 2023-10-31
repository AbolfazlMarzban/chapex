export default {
    methods: {
        getAllDesignOptionValues(salePage) {
            if (salePage)
                return salePage.optionsValues.filter(c => c.TD_FType == 21704)
        },
        getDesignOptionValues(salePage) {
            if (salePage) {
                const selectedChildrenIds = salePage.optionsValues.filter(ov => ov.isSelected).map(sc => sc.TD_FID)

                return salePage.optionsValues.filter(c => c.TD_FType == 21704 && this.isAllChildDepends(salePage, selectedChildrenIds, c.TD_FID))
            }
        },
        selectDesignOptionValues(salePage, selectedChildren) {
            if (salePage) {
                return salePage.optionsValues.filter(c => c.TD_FType == 21704 && this.isAllChildDepends(salePage, selectedChildren, c.TD_FID))
            }
        },
        productHasDesignOptionValue(salePage, productId) {
            if (salePage && productId) {
                const designOptionValues = this.getAllDesignOptionValues(salePage)
                const productsOptionValues = this.getProductOptionValues(salePage, productId)

                if (productsOptionValues.length > 0 && designOptionValues.length > 0) {
                    for (var i = 0; i <= productsOptionValues.length - 1; i++) {
                        const designOptionValue = designOptionValues.find(ov => ov.TD_FID == productsOptionValues[i].TGPV_FID_Value)
                        if (designOptionValue) {
                            const designOption = salePage.options.find(o => o.TD_FID == designOptionValue.TD_FID_Group)
                            if (this.optionCanShow('userSet', salePage, designOption)) {
                                return true
                            }
                        }
                    }
                }
            }
            return false
        },

        getAllReviewOptionValues(salePage) {
            if (salePage)
                return salePage.optionsValues.filter(c => c.TD_FType == 21705)
        },
        getReviewOptionValues(salePage) {
            if (salePage) {
                const selectedChildrenIds = salePage.optionsValues.filter(ov => ov.isSelected).map(sc => sc.TD_FID)

                return salePage.optionsValues.filter(c => c.TD_FType == 21705 && this.isAllChildDepends(salePage, selectedChildrenIds, c.TD_FID))
            }
        },
        selectReviewOptionValues(salePage, selectedChildren) {
            if (salePage) {
                return salePage.optionsValues.filter(c => c.TD_FType == 21705 && this.isAllChildDepends(salePage, selectedChildren, c.TD_FID))
            }
        },
        productHasReviewOptionValue(salePage, product) {
            if (salePage && product) {
                const designOptionValues = this.getAllReviewOptionValues(salePage)
                const productsOptionValues = this.getProductOptionValues(salePage, product.TGO_FID)
                if (productsOptionValues.length > 0 && designOptionValues.length > 0) {
                    for (var i = 0; i <= productsOptionValues.length - 1; i++) {
                        const res = designOptionValues.find(ov => ov.TD_FID == productsOptionValues[i].TGPV_FID_Value)
                        if (res)
                            return true
                    }
                }
            }

            return false
        },

    }
}