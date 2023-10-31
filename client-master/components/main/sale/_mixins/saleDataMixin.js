export default {
    methods: {
        getOption(salePage, optionId) {
            if (salePage && salePage.options)
                return salePage.options.find(o => o.TD_FID == optionId)
        },
        getOptionValues(salePage, optionId) {
            if (salePage && salePage.optionsValues)
                return salePage.optionsValues.filter(c => c.TD_FID_Group == optionId)
        },
        getOptionValue(salePage, valueId) {
            if (salePage && salePage.optionsValues)
                return salePage.optionsValues.find(c => c.TD_FID == valueId)
        },
        getOptionName_byOptionValueId(salePage, valueId) {
            const optionValue = this.getOptionValue(salePage, valueId)
            // console.log('optionValue', optionValue)
            if (optionValue) {
                const option = this.getOption(salePage, optionValue.TD_FID_Group)
                if (option)
                    return option.TD_FName
            }
        },
        getRelatedGood_FTag(salePage, childId, productId) {

            const product = salePage.products.find(p => p.TGO_FID == productId)
            if (product) {
                const productOptionValues = this.getProductOptionValues(salePage, productId)
                if (productOptionValues) {

                    const productOptionValue = productOptionValues.find(o => o.TGPV_FID_Value == childId)
                    if (productOptionValue) {
                        const relatedGood = salePage.relatedGoods.find(rg => rg.TGO_FID == productOptionValue.TGPV_FID_Goods)
                        if (relatedGood) {
                            if (relatedGood.TGO_FTag.length > 0) {
                                return relatedGood.TGO_FTag
                            }
                        }
                    }
                }
            }

            return null
        },
        getOptionName_byOptionValueId(salePage, valueId) {
            const optionValue = this.getOptionValue(salePage, valueId)
            // console.log('optionValue', optionValue)

            if (optionValue && optionValue.TD_FType == 21703) {
                const option = this.getOption(salePage, optionValue.TD_FID_Group)
                if (option)
                    return option.TD_FName
            }
        },
        getRelatedGood_FTag(salePage, childId, productId) {

            const product = salePage.products.find(p => p.TGO_FID == productId)
            if (product) {
                const productOptionValues = this.getProductOptionValues(salePage, productId)
                if (productOptionValues) {

                    const productOptionValue = productOptionValues.find(o => o.TGPV_FID_Value == childId)
                    if (productOptionValue) {
                        const relatedGood = salePage.relatedGoods.find(rg => rg.TGO_FID == productOptionValue.TGPV_FID_Goods)
                        if (relatedGood) {
                            if (relatedGood.TGO_FTag.length > 0) {
                                return relatedGood.TGO_FTag
                            }
                        }
                    }
                }
            }

            return null
        },
        getOptionValueName(salePage, valueId) {
            const optionValue = this.getOptionValue(salePage, valueId)

            if (optionValue && optionValue.TD_FType == 21703)
                return optionValue.TD_FName
        },
        getOptionForValue(salePage, valueId) {
            const child = this.getOptionValue(salePage, valueId)
            if (child)
                return this.getOption(salePage, child.TD_FID_Group)
        },
        getProductOptionValues(salePage, productId) {
            if (salePage && salePage.productsOptionValue)
                return salePage.productsOptionValue.filter(c => c.TGPV_FID_Product == productId)
        },
        getOptionInProductsOptionValue(salePage, optionId) {
            if (salePage && salePage.productsOptionValue)
                return salePage.productsOptionValue.filter(c => c.TGPV_FID_Option == optionId)
        },
        getOptionValueInProductsOptionValue(salePage, optionValueId) {
            if (salePage && salePage.productsOptionValue)
                return salePage.productsOptionValue.filter(c => c.TGPV_FID_Value == optionValueId)
        },

        isAllChildDepends(salePage, selectedChildrenIds, optionValueIdToCheck) {

            const optionValueToCheck = this.getOptionValue(salePage, optionValueIdToCheck)
            const selectedDeps = optionValueToCheck.dependecy.filter(depId => selectedChildrenIds.includes(depId))
            const notSelectedDeps = optionValueToCheck.dependecy.filter(depId => !selectedChildrenIds.includes(depId))

            if (optionValueToCheck.dependecy.length == 0)
                return true

            if (optionValueToCheck.dependecy.every(depId => selectedChildrenIds.includes(depId)))
                return true

            let ret = false



            let selectedDepsClone = JSON.parse(JSON.stringify(selectedDeps))
            notSelectedDeps.forEach(niId => {
                const notSelectedDep = this.getOptionValue(salePage, niId)

                if (notSelectedDep) {
                    selectedDeps.forEach(inc => {
                        const selectedDep = this.getOptionValue(salePage, inc)

                        if (optionValueToCheck.dependecy.includes(niId))
                            if (selectedDep.TD_FID_Group == notSelectedDep.TD_FID_Group)
                                selectedDepsClone.push(niId)
                    })
                }
            })

            return optionValueToCheck.dependecy.every(depId => selectedDepsClone.includes(depId))
        },

        calcPrice(salePage, productId, tiraj, seri) {

            var total = 0;

            if (salePage) {
                salePage.optionsValues.filter(ov => ov.isSelected).forEach(selectedChild => {

                    const productOptionValues = salePage.productsOptionValue.filter(pov => pov.TGPV_FID_Value == selectedChild.TD_FID && pov.TGPV_FID_Product == productId)

                    productOptionValues.forEach(productOptionValue => {
                        const relatedGood = salePage.relatedGoods.find(p => p.TGO_FID == productOptionValue.TGPV_FID_Goods)
                        const res = this.calcProductOptionValuePrice(productOptionValue, tiraj, relatedGood)
                        total += res
                    })
                })
            }

            return seri * total
        },

        calcPriceInCart(salePage, productId, selectedChildren, tiraj, seri) {

            const _salePage = JSON.parse(JSON.stringify(salePage))
            if (_salePage) {
                selectedChildren.forEach(selectedChild => {
                    const child = _salePage.optionsValues.find(ov => ov.TD_FID == selectedChild)
                    if (child)
                        child.isSelected = 1
                    child.product = productId
                })
            }

            return this.calcPrice(_salePage, productId, tiraj, seri)
        },

        calcDesignPriceInCart(salePage, productId, selectedChildren) {

            var total = 0;

            if (salePage) {
                salePage.optionsValues.filter(ov => ov.TD_FType == 21704 && selectedChildren.includes(ov.TD_FID)).forEach(selectedChild => {

                    const productOptionValues = salePage.productsOptionValue.filter(pov => pov.TGPV_FID_Value == selectedChild.TD_FID && pov.TGPV_FID_Product == productId)

                    productOptionValues.forEach(productOptionValue => {
                        const relatedGood = salePage.relatedGoods.find(p => p.TGO_FID == productOptionValue.TGPV_FID_Goods)
                        const res = this.calcProductOptionValuePrice(productOptionValue, 1, relatedGood)
                        total += res
                    })
                })
            }
            return total
        },

        calcReviewPriceInCart(salePage, productId, selectedChildren) {

            var total = 0;

            if (salePage) {
                salePage.optionsValues.filter(ov => ov.TD_FType == 21705 && this.isAllChildDepends(salePage, selectedChildren, ov.TD_FID)).forEach(selectedChild => {

                    const productOptionValues = salePage.productsOptionValue.filter(pov => pov.TGPV_FID_Value == selectedChild.TD_FID && pov.TGPV_FID_Product == productId)

                    productOptionValues.forEach(productOptionValue => {
                        const relatedGood = salePage.relatedGoods.find(p => p.TGO_FID == productOptionValue.TGPV_FID_Goods)
                        const res = this.calcProductOptionValuePrice(productOptionValue, 1, relatedGood)
                        total += res
                    })
                })
            }
            return total
        },

        calcProductOptionValuePrice(productOptionValue, tiraj, relatedGood) {
            if (relatedGood) {
                var FCount = productOptionValue.TGPV_FCount ? productOptionValue.TGPV_FCount : 1;
                var Np = tiraj * FCount;

                if (relatedGood.TGO_FSaleMin > Np) {
                    if (relatedGood.TGO_FSaleMin)
                        Np = relatedGood.TGO_FSaleMin;
                }

                var FWaste = productOptionValue.TGPV_FWaste ? productOptionValue.TGPV_FWaste : 0
                var FPrice = productOptionValue.TGPV_FPrice ? productOptionValue.TGPV_FPrice : 1

                var FSalePriceMax = relatedGood.TGO_FSalePriceMax
                    ? relatedGood.TGO_FSalePriceMax
                    : 0;
                var FSalePriceFix = relatedGood.TGO_FSalePriceFix
                    ? relatedGood.TGO_FSalePriceFix
                    : 0;
                var FBuyPercent = relatedGood.TGO_FBuyPercent
                    ? relatedGood.TGO_FBuyPercent
                    : 0;
                var FRepet = productOptionValue.TGPV_FRepet ? productOptionValue.TGPV_FRepet : 1;

                var Pu = FSalePriceMax * FPrice
                var Nw = FWaste * FCount

                var res = Np * Pu;
                res += Nw * Pu;
                res += FSalePriceFix + FBuyPercent;

                res *= FRepet;

                return res
            }

            return 0
        },

        // create_SelectedChildrenDBObject(cartData, paymentData) {

        //     paymentData.totalPrice = 0
        //     for (var i = 0; i <= cartData.currentCartItems.length - 1; i++) {

        //         const cartItem = cartData.currentCartItems[i]

        //         cartItem.SelectedChildrenDBObject = []
        //         cartItem.TOD_FPriceTotal = 0
        //         for (var j = 0; j <= cartItem.TOD_FID_SelectedOptions.length - 1; j++) {

        //             const salePage = cartData.salePages.find(sp => sp.TPS_FID == cartItem.TOD_FID_SalePage)
        //             if (salePage) {
        //                 const optionValueId = cartItem.TOD_FID_SelectedOptions[j]
        //                 const optionValue = this.getOptionValue(cartItem.salePage, optionValueId)
        //                 const productOptionValue = this.getProductOptionValues(cartItem.salePage, cartItem.TOD_FID_Goods, optionValueId)

        //                 if (optionValue && productOptionValue) {
        //                     const price = this.calcProductOptionPrice(productOptionValue, cartItem.TOD_FCount)
        //                     var obj = {
        //                         TOP_FID_Option: optionValue.TD_FID_Group,
        //                         TOP_FID_OptionValue: optionValueId,
        //                         TOP_FCaption: this.getChildOptionName(cartItem.salePage, optionValueId),
        //                         TOP_FComment: this.getChildName(cartItem.salePage, optionValueId),
        //                         TOP_FPrice: price,
        //                         TOP_FDelete: 0,
        //                         TOP_FDiscount: 0,
        //                         TOP_FBMan: null,
        //                         TOP_FState: null,
        //                         FLastOption: null,
        //                     }

        //                     cartItem.SelectedChildrenDBObject.push(obj)
        //                     cartItem.TOD_FPriceTotal += price
        //                 }
        //             }
        //         }

        //         paymentData.totalPrice += cartItem.TOD_FPriceTotal

        //         cartItem.TOD_FPrice = cartItem.TOD_FPriceTotal / cartItem.TOD_FCount
        //         cartItem.salePage = null
        //     }
        // },

        async valueAddedTax() {
            try {
                const result = await this.$authAxios.$get("/defaults/get/20301?mode=show")
                if (result) {
                    return result.data.form.TD_FValue2
                }
            } catch (error) {
                console.log(error)
            }
        },

        priceWithValueAddedTax(salePage, finalPrice) {
            return finalPrice + (finalPrice * salePage.valueAddedTax)
        },
    }
}