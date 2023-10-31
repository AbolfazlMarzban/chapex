export default {

    methods: {

        getChild(salePage, childId) {
            if (salePage && salePage.all_children)
                return salePage.all_children.find(c => c.TD_FID == childId)
        },
        getChildName(salePage, childId) {
            const child = this.getChild(salePage, childId)
            if (child)
                return child.TD_FName
        },
        // getOption(salePage, optionId) {
        //     if (salePage && salePage.options)
        //         return salePage.options.find(o => o.TD_FID == optionId)
        // },
        // getChildOption(salePage, childId) {
        //     const child = this.getChild(salePage, childId)
        //     if (child)
        //         return this.getOption(salePage, child.TD_FID_Group)
        // },
        getChildOptionName(salePage, childId) {
            const option = this.getChildOption(salePage, childId)
            if (option)
                return option.TD_FName
        },
        getOptions(salePage, state) {
            let FType = 21703

            if (state == 'salePage')
                FType = 21703
            if (state == 'design')
                FType = 21704
            if (state == 'review')
                FType = 21705

            return salePage.options.filter(c => c.TD_FType == FType)
        },
        getOptionChildren(salePage, optionId) {
            if (salePage && salePage.all_children)
                return salePage.all_children.filter(c => c.TD_FID_Group == optionId)
        },
        getProduct(salePage, productId) {
            if (salePage && salePage.products)
                return salePage.products.find(p => p.TGO_FID == productId)
        },
        getProductName(salePage, productId) {
            const product = this.getProduct(salePage, productId)
            if (product) 
                return product.TGO_FName
        },
        getProductOption(salePage, productId, childId) {
            if (salePage) {
                const product = this.getProduct(salePage, productId)
                if (product) {
                    return product.options.find(opt => opt.TGPV_FID_Value == childId)
                }
            }

            return null
        },
        // getDesignChild(salePage, selectedChildrenIds) {
        //     if (salePage)
        //         return salePage.all_children.find(c => c.TD_FType == 21704 && this.isChildDepends(salePage, selectedChildrenIds, c.TD_FID))
        // },
        // getReviewChild(salePage, selectedChildrenIds) {
        //     if (salePage)
        //         return salePage.all_children.find(c => c.TD_FType == 21705 && this.isChildDepends(salePage, selectedChildrenIds, c.TD_FID))
        // },
        // getChildTagFromProduct(salePage, childId, productId) {

        //     const product = this.getProduct(salePage, productId)
        //     if (product) {
        //         const ret = product.options.find(o => o.TGPV_FID_Value == childId)

        //         if (ret) {
        //             if (ret.realted_good) {
        //                 if (ret.realted_good.TGO_FTag.length > 0) {
        //                     return ret.realted_good.TGO_FTag
        //                 }
        //             }
        //         }
        //     }

        //     return null
        // },

        // calcFinalPrice(salePage, selectedChildrenIds, productId, tiraj) {

        //     var total = 0;

        //     const product = this.getProduct(salePage, productId)
        //     if (selectedChildrenIds && selectedChildrenIds.length > 0 && product && product.options) {

        //         var salePageChildrenIds = this.removeDesignChild(salePage, selectedChildrenIds)
        //         salePageChildrenIds = this.removeReviewChild(salePage, salePageChildrenIds)
        //         salePageChildrenIds.forEach(selectedChildId => {

        //             const productOption = product.options.find(o => o.TGPV_FID_Value == selectedChildId)
        //             if (productOption) {
        //                 const res = this.calcProductOptionPrice(productOption, tiraj)
        //                 total += res
        //             }
        //         })
        //     }

        //     if (this.hasDesignChild(salePage, selectedChildrenIds))
        //         total += this.calcDesignPrice(salePage, selectedChildrenIds, productId)

        //     if (this.hasReviewChild(salePage, selectedChildrenIds))
        //         total += this.calcReviewPrice(salePage, selectedChildrenIds, productId)

        //     return total
        // },
        // calcProductOptionPrice(productOption, tiraj) {
        //     if (productOption.realted_good) {
        //         var FCount = productOption.TGPV_FCount ? productOption.TGPV_FCount : 0;
        //         var FNumber = tiraj * FCount;

        //         if (productOption.realted_good.TGO_FSaleMin > FNumber) {
        //             FNumber = productOption.realted_good.TGO_FSaleMin;
        //         }

        //         var FWaste = productOption.TGPV_FWaste ? productOption.TGPV_FWaste : 0

        //         var FSalePriceMax = productOption.realted_good.TGO_FSalePriceMax
        //             ? productOption.realted_good.TGO_FSalePriceMax
        //             : 0;
        //         var FSalePriceFix = productOption.realted_good.TGO_FSalePriceFix
        //             ? productOption.realted_good.TGO_FSalePriceFix
        //             : 0;
        //         var FBuyPercent = productOption.realted_good.TGO_FBuyPercent
        //             ? productOption.realted_good.TGO_FBuyPercent
        //             : 0;
        //         var FRepet = productOption.TGPV_FRepet ? productOption.TGPV_FRepet : 0;

        //         var res = FNumber * FSalePriceMax;
        //         res += FCount * FWaste * FSalePriceMax;
        //         res += FSalePriceFix + FBuyPercent;

        //         res *= FRepet;

        //         return res
        //     }

        //     return 0
        // },
        // calcDesignPrice(salePage, selectedChildrenIds, finalProductId) {
        //     const designChild = this.getDesignChild(salePage, selectedChildrenIds)
        //     if (designChild) {
        //         const productOption = this.getProductOption(salePage, finalProductId, designChild.TD_FID)

        //         var res = 0;
        //         if (productOption) {
        //             if (productOption.realted_good) {
        //                 var FCount = productOption.TGPV_FCount ? productOption.TGPV_FCount : 0;

        //                 var FSalePriceMax = productOption.realted_good.TGO_FSalePriceMax
        //                     ? productOption.realted_good.TGO_FSalePriceMax
        //                     : 0;
        //                 var FSalePriceFix = productOption.realted_good.TGO_FSalePriceFix
        //                     ? productOption.realted_good.TGO_FSalePriceFix
        //                     : 0;
        //                 var FBuyPercent = productOption.realted_good.TGO_FBuyPercent
        //                     ? productOption.realted_good.TGO_FBuyPercent
        //                     : 0;
        //                 var FRepet = productOption.TGPV_FRepet ? productOption.TGPV_FRepet : 0;

        //                 res = FCount * FSalePriceMax;
        //                 res += FSalePriceFix + FBuyPercent;
        //                 res *= FRepet;
        //             }
        //         }

        //         return res
        //     }

        //     return 0
        // },
        // calcReviewPrice(salePage, selectedChildrenIds, finalProductId) {
        //     const reviewChild = this.getReviewChild(salePage, selectedChildrenIds)
        //     if (reviewChild) {
        //         const productOption = this.getProductOption(salePage, finalProductId, reviewChild.TD_FID)

        //         var res = 0;
        //         if (productOption) {
        //             if (productOption.realted_good) {
        //                 var FCount = productOption.TGPV_FCount ? productOption.TGPV_FCount : 0;

        //                 var FSalePriceMax = productOption.realted_good.TGO_FSalePriceMax
        //                     ? productOption.realted_good.TGO_FSalePriceMax
        //                     : 0;
        //                 var FSalePriceFix = productOption.realted_good.TGO_FSalePriceFix
        //                     ? productOption.realted_good.TGO_FSalePriceFix
        //                     : 0;
        //                 var FBuyPercent = productOption.realted_good.TGO_FBuyPercent
        //                     ? productOption.realted_good.TGO_FBuyPercent
        //                     : 0;
        //                 var FRepet = productOption.TGPV_FRepet ? productOption.TGPV_FRepet : 0;

        //                 res = FCount * FSalePriceMax;
        //                 res += FSalePriceFix + FBuyPercent;
        //                 res *= FRepet;
        //             }
        //         }

        //         return res
        //     }

        //     return 0
        // },


        // isChildDepends(salePage, childrenIds, childIdToCheck) {

        //     var ret = null
        //     const childToCheck = this.getChild(salePage, childIdToCheck)
        //     if (childToCheck.dependecy.length == 0)
        //         return true

        //     childToCheck.dependecy.forEach(depId => {
        //         const res = childrenIds.findIndex(child => child == depId)

        //         if (res > -1)
        //             ret = true
        //     })

        //     return ret
        // },

        // hasDesignChild(salePage, selectedChildrenIds) {
        //     const designChild = this.getDesignChild(salePage, selectedChildrenIds)
        //     if (designChild) {
        //         const design_index = selectedChildrenIds.findIndex(c => c == designChild.TD_FID)
        //         if (design_index > -1) {
        //             return true
        //         }
        //     }

        //     return false
        // },
        // hasReviewChild(salePage, selectedChildrenIds) {
        //     const reviewChild = this.getReviewChild(salePage, selectedChildrenIds)
        //     if (reviewChild) {
        //         const review_index = selectedChildrenIds.findIndex(c => c == reviewChild.TD_FID)
        //         if (review_index > -1) {
        //             return true
        //         }
        //     }

        //     return false
        // },

        // removeDesignChild(salePage, selectedChildrenIds) {
        //     const designChild = this.getDesignChild(salePage, selectedChildrenIds)
        //     if (designChild) {
        //         return selectedChildrenIds.filter(c => c != designChild.TD_FID)
        //     }
        //     return selectedChildrenIds
        // },
        // removeReviewChild(salePage, selectedChildrenIds) {
        //     const reviewChild = this.getReviewChild(salePage, selectedChildrenIds)
        //     if (reviewChild) {
        //         return selectedChildrenIds.filter(c => c != reviewChild.TD_FID)
        //     }
        //     return selectedChildrenIds
        // },





        // findProduct_old(salePage, selectedChildren) {


        //     const options = this.getOptions(salePage, 'salePage')

        //     if (options) {
        //         if (selectedChildren.length == options.length) {

        //             for (var i = 0; i < salePage.products.length; i++) {
        //                 var product = salePage.products[i];
        //                 var inc_children = this.optionsChildrenToGoodsValue(salePage, product, selectedChildren)

        //                 if (inc_children) {
        //                     // console.log('inc_children', inc_children);
        //                     return product;
        //                 }
        //             }
        //         }
        //     }
        //     return null;
        // },

        // findProduct(salePage, selectedChildren) {
        //     const options = this.getOptions(salePage, 'salePage')
        //     if (options) {

        //         var results = salePage.products.filter(product => this.hasSelectedChildren(salePage, selectedChildren, product))
        //         // console.log('found products', results.length);
        //         if (results.length == 1)
        //             return results[0]
        //     }

        //     return null
        // },

        // hasSelectedChildren(salePage, selectedChildren, product) {
        //     for (var i = 0; i <= selectedChildren.length - 1; i++) {
        //         var child = selectedChildren[i]

        //         var index = product.options.findIndex(o => o.TGPV_FID_Value == child.TD_FID)
        //         if (index == -1)
        //             return false
        //     }

        //     return true
        // },

        goodsValueToOptionsChildren(salePage, product) {

            if (salePage && product) {

                var salePage_optionsChildren = []
                const options = this.getOptions(salePage, 'salePage')

                options.forEach(option => {
                    var goodValues = product.options.filter(po => po.TGPV_FID_Option == option.TD_FID)

                    if (goodValues.length > 0) {
                        var child = option.children.find(c => c.TD_FID == goodValues[0].TGPV_FID_Value)
                        if (child)
                            salePage_optionsChildren.push(child)
                    }
                })

                if (salePage_optionsChildren.length > 0)
                    return salePage_optionsChildren
            }

            return []
        },

        optionsChildrenToGoodsValue(salePage, product, selectedChildren) {

            var inc_children = null

            if (salePage && product) {
                const options = this.getOptions(salePage, 'salePage')

                var ret = []

                selectedChildren.forEach(selectedChild => {
                    product.options.forEach(goodValue => {
                        if (goodValue.TGPV_FID_Value == selectedChild.TD_FID) {

                            const index = ret.findIndex(r => r.TGPV_FID_Option == goodValue.TGPV_FID_Option)

                            if (index == -1) {
                                ret.push(goodValue)
                            }
                        }
                    })
                })
                // console.log('ret.length', ret.length);
                // console.log('options.length', options.length);

                if (ret.length == options.length)
                    inc_children = ret
            }

            return inc_children
        },

        calc_price(salePage, product, selectedChildren, count) {
            var total = 0;
            var childrenInProduct = this.optionsChildrenToGoodsValue(salePage, product, selectedChildren)

            if (childrenInProduct) {
                childrenInProduct.forEach(child => {
                    var res = 0;
                    if (child) {
                        if (child.realted_good) {
                            var FCount = child.TGPV_FCount ? child.TGPV_FCount : 0;
                            var FNumber = count * FCount;

                            if (child.realted_good.TGO_FSaleMin > FNumber) {
                                FNumber = child.realted_good.TGO_FSaleMin;
                            }

                            var FWaste = child.TGPV_FWaste ? child.TGPV_FWaste : 0

                            var FSalePriceMax = child.realted_good.TGO_FSalePriceMax
                                ? child.realted_good.TGO_FSalePriceMax
                                : 0;
                            var FSalePriceFix = child.realted_good.TGO_FSalePriceFix
                                ? child.realted_good.TGO_FSalePriceFix
                                : 0;
                            var FBuyPercent = child.realted_good.TGO_FBuyPercent
                                ? child.realted_good.TGO_FBuyPercent
                                : 0;
                            var FRepet = child.TGPV_FRepet ? child.TGPV_FRepet : 0;

                            res = FNumber * FSalePriceMax;
                            res += FCount * FWaste * FSalePriceMax;
                            res += FSalePriceFix + FBuyPercent;

                            res *= FRepet;
                            total += res;
                        }
                    }
                });
            }

            return total
        },


        designChildInProduct(salePage, product, selectedChildren) {

            var ret = null
            if (salePage && product) {

                const designChilrden = salePage.all_children.find(c => c.TD_FType == 21704 && this.isInDeps(selectedChildren, c))

                if (designChilrden) {
                    ret = product.options.find(opt => opt.TGPV_FID_Value == designChilrden.TD_FID)
                }
            }

            return ret
        },
        calc_designPrice(salePage, product, selectedChildren) {
            var total = 0;

            var child = this.designChildInProduct(salePage, product, selectedChildren)

            var res = 0;
            if (child) {
                if (child.realted_good) {
                    var FCount = child.TGPV_FCount ? child.TGPV_FCount : 0;

                    var FSalePriceMax = child.realted_good.TGO_FSalePriceMax
                        ? child.realted_good.TGO_FSalePriceMax
                        : 0;
                    var FSalePriceFix = child.realted_good.TGO_FSalePriceFix
                        ? child.realted_good.TGO_FSalePriceFix
                        : 0;
                    var FBuyPercent = child.realted_good.TGO_FBuyPercent
                        ? child.realted_good.TGO_FBuyPercent
                        : 0;
                    var FRepet = child.TGPV_FRepet ? child.TGPV_FRepet : 0;

                    res = FCount * FSalePriceMax;
                    res += FSalePriceFix + FBuyPercent;
                    res *= FRepet;
                    total += res;
                }
            }

            return total
        },

        reviewChildInProduct(salePage, product, selectedChildren) {

            var ret = null
            if (salePage && product) {

                const designChilrden = salePage.all_children.find(c => c.TD_FType == 21705 && this.isInDeps(selectedChildren, c))

                if (designChilrden) {
                    ret = product.options.find(opt => opt.TGPV_FID_Value == designChilrden.TD_FID)
                }
            }

            return ret
        },
        calc_reviewPrice(salePage, product, selectedChildren) {
            var total = 0;

            var child = this.reviewChildInProduct(salePage, product, selectedChildren)

            var res = 0;
            if (child) {
                if (child.realted_good) {
                    var FCount = child.TGPV_FCount ? child.TGPV_FCount : 0;

                    var FSalePriceMax = child.realted_good.TGO_FSalePriceMax
                        ? child.realted_good.TGO_FSalePriceMax
                        : 0;
                    var FSalePriceFix = child.realted_good.TGO_FSalePriceFix
                        ? child.realted_good.TGO_FSalePriceFix
                        : 0;
                    var FBuyPercent = child.realted_good.TGO_FBuyPercent
                        ? child.realted_good.TGO_FBuyPercent
                        : 0;
                    var FRepet = child.TGPV_FRepet ? child.TGPV_FRepet : 0;

                    res = FCount * FSalePriceMax;
                    res += FSalePriceFix + FBuyPercent;
                    res *= FRepet;
                    total += res;
                }
            }

            return total
        }
    }
}