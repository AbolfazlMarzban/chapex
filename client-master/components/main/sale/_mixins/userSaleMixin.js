
export default {
  methods: {
    async getSalePage(id) {
      try {
        const response = await this.$authAxios.$get(`salePageUser/getbyflink/${id}?mode=init`);

        return response.data;

      } catch (error) {
        console.log(error);
      }
    },

    async getSalePageId(flink) {
      try {
        if (flink && this.$authAxios) {
          const response = await this.$authAxios.$get(`salePageUser/getid/${flink}`);
          return response.data;
        }

      } catch (error) {
        console.log(error);
      }
    },

    async getSalePageById(id) {
      try {
        // console.log('getSalePageById');
        const response = await this.$authAxios.$get(`salePageUser/get/${id}?mode=init`);

        return response.data;

      } catch (error) {
        console.log(error);
      }
    },

    async registerProductToSaleCart(data) {
      try {
        const result = await this.$authAxios.$post("/cart", { data });

        if (result) {
          console.log("the product registered in cart  root");
        }
        return result;
      } catch (error) {
        console.log(error)
      }

    },


    optionCanShow(state, salePage, option) {

      if (option.TD_FActionToDeps == 23102) //نمایش همیشگی
        return true

      if (state == 'backgroundSet') {
        if (option.TD_ActionToBgSet) {
          return false
        }
      }
      else {
        if (option.TD_FFormType == 1) {
          if (!this.depSelected(salePage, option))
            return false
        }

        if (option.TD_FHideOnAloneSet == 1) {
          const activeItems = this.getActiveItems(state, salePage, option)
          if (activeItems.length <= 1) {
            return false
            // const hasUserSet = this.hasUserSet(this.salePage)
            // if (!hasUserSet)
          }
        }

        if (option.TD_FActive == 0)
          return false
      }

      return true
    },

    depSelected(salePage, option) {

      var ret = false

      const optionValues = salePage.optionsValues.filter(ov => ov.TD_FID_Group == option.TD_FID)

      salePage.optionsValues.filter(ov => ov.isSelected).forEach(ov2 => {
        optionValues.forEach(ov1 => {
          if (this.isInDep(ov1, ov2))
            ret = true
        })
      })

      return ret
    },

    allDepsSelected(salePage, option) {

      const selectedChildrenIds = salePage.optionsValues.filter(ov => ov.isSelected).map(sc => sc.TD_FID)
      const optionValues = salePage.optionsValues.filter(ov => ov.TD_FID_Group == option.TD_FID)
      const depOptions = []
      const depOptionsValues = []

      optionValues.forEach(ov => {
        const selectedDeps = ov.dependecy.filter(depId => selectedChildrenIds.includes(depId))
        selectedDeps.forEach(sov => {
          const index = depOptionsValues.findIndex(dov => dov == sov)

          if (index == -1)
            depOptionsValues.push(sov)
        })
        ov.dependecy.forEach(dep => {
          const depov = salePage.optionsValues.find(ov => ov.TD_FID == dep)
          const index = depOptions.findIndex(d => d == depov.TD_FID_Group)

          if (index == -1)
            depOptions.push(depov.TD_FID_Group)
        })
      })

      return (depOptionsValues.length == depOptions.length)
    },

    getActiveItems(state, salePage, option) {
      if (option && salePage.optionsValues) {
        const optionsValues = salePage.optionsValues.filter(ov => ov.TD_FID_Group == option.TD_FID)
        return optionsValues.filter(c => !this.childDisabledByDeps(state, salePage, option, c))

      }
      return []
    },

    hasUserSet(salePage) {
      const ret = salePage.optionsValues.filter(ov => ov.isSelected == 2)
      if (ret.length > 0)
        return true

      return false
    },

    hasAnySet(salePage) {
      const res = salePage.optionsValues.filter(ov => ov.isSelected)

      if (res.length > 0)
        return true

      return false
    },

    hasAnySet(salePage, optionId) {
      const optionValues = salePage.optionsValues.filter(ov => ov.TD_FID_Group == optionId && ov.isSelected)

      if (optionValues.length > 0)
        return true

      return false
    },

    getAnySet(salePage) {
      return salePage.optionsValues.find(ov => ov.isSelected)
    },

    getAnySet(salePage, optionId) {
      return salePage.optionsValues.find(ov => ov.TD_FID_Group == optionId && ov.isSelected)
    },

    getRelatedGoodTag(optionValueId, salePage) {
      const relatedGood = salePage.relatedGoods.find(o => o.TGPV_FID_Goods == optionValueId)

      if (relatedGood) {
        if (relatedGood.TGO_FTag.length > 0) {
          return relatedGood.TGO_FTag
        }
      }

      return null
    },

    isInDep(optionValue1, optionValue2) {

      if (optionValue1 && optionValue2) {
        if (optionValue1.dependecy) {
          const res = optionValue1.dependecy.findIndex(d => d == optionValue2.TD_FID)
          if (res > -1)
            return true
        }

        if (optionValue2.dependecy) {
          const res = optionValue2.dependecy.findIndex(d => d == optionValue1.TD_FID)
          if (res > -1)
            return true
        }
      }

      return null
    },

    isOptionsMatesInDep(salePage, parent, dep) {
      const optionMates = salePage.optionsValues.filter(
        c => c.TD_FID_Group == dep.TD_FID_Group && c.TD_FID != dep.TD_FID
      );

      let ret = false
      if (optionMates && optionMates.length > 0) {
        optionMates.forEach(optionMate => {
          if (this.isInDep(parent, optionMate)) {
            ret = true
          }
        })
      }

      return ret
    },

    childDisabledByDeps(state, salePage, option, optionValue) {

      optionValue.disableReason = null;
      let ret = false
      if (salePage) {

        salePage.optionsValues
          // .filter(ov => ov.isSelected == 2 || ov.isSelected == 3 || ov.isSelected == 4 || ov.isSelected == 7)
          .filter(ov => ov.isSelected == 2 || ov.isSelected == 4)
          .forEach(ov => {
            if (this.isOptionsMatesInDep(salePage, ov, optionValue) && !this.isInDep(ov, optionValue)) {
              if (state == 'userSet') {
                optionValue.disableReason = ov;
                ret = true;
              }
              else
                ret = true
            }
          })
      }

      return ret;
    },

    clearSelectionForOption(salePage, optionId, optionValueId) {
      if (salePage) {
        salePage.optionsValues.filter(ov => (ov.TD_FID_Group == optionId && ov.TD_FID != optionValueId)).forEach(ov => ov.isSelected = 0)
      }
    },

    clearSelectionNotInDeps(salePage, option, optionValue) {
      if (salePage) {
        salePage.optionsValues
          .filter(ov => ov.TD_FID_Group != optionValue.TD_FID_Group)
          .filter(ov => (ov.isSelected == 2 || ov.isSelected == 4))
          .forEach(ov => {
            const scOption = salePage.options.find(o => o.TD_FID == ov.TD_FID_Group)
            if (this.childDisabledByDeps('userSet', salePage, scOption, ov)) {
              scOption.autoChangeReason = optionValue
              ov.isSelected = 0
            }
          })
      }
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

    findFinalProduct(salePage, tiraj) {
      if (tiraj && tiraj > 0) {
        const options = this.getOptions(salePage, 'salePage')
        if (options) {
          if (this.hasRequiredChildren(salePage)) {

            var results = salePage.products.filter(product => this.hasSelectedChildren(salePage, product) && this.hasTirajRange(product, tiraj))
            if (results.length == 1)
              return results[0]
          }
        }
      }

      return null
    },

    findFinalProductNotInRange(salePage) {
      if (salePage) {
        const options = this.getOptions(salePage, 'salePage')
        if (options) {
          if (this.hasRequiredChildren(salePage)) {

            var results = salePage.products.filter(product => this.hasSelectedChildren(salePage, product))
            if (results.length == 1)
              return results[0]
          }
        }
      }

      return null
    },

    hasRequiredChildren(salePage) {
      let ret = true

      if (salePage && salePage.options) {
        const options = this.getOptions(salePage, 'salePage')
        const requiredOptions = options.filter(o => o.TD_FRequired == 1)
        requiredOptions.forEach(reqOption => {
          if (!this.hasAnySet(salePage, reqOption.TD_FID))
            ret = false
        })
      }

      return ret
    },

    allChildrenSelected(salePage) {
      let ret = true

      if (salePage && salePage.options) {
        const options = this.getOptions(salePage, 'salePage').filter(o => this.optionCanShow('userSet', salePage, o))
        options.forEach(reqOption => {
          if (!this.hasAnySet(salePage, reqOption.TD_FID))
            ret = false
        })
      }

      return ret
    },

    hasSelectedChildren(salePage, product) {
      let ret = true
      salePage.optionsValues.filter(ov => (ov.isSelected && (ov.isSelected != 5 && ov.isSelected != 6))).forEach(child => {
        var index = salePage.productsOptionValue.findIndex(o => o.TGPV_FID_Value == child.TD_FID && o.TGPV_FID_Product == product.TGO_FID)
        if (index == -1)
          ret = false
      })

      return ret
    },

    hasTirajRange(product, tiraj) {

      if (product.TGO_FNumberMax > 0) {
        if (tiraj > product.TGO_FNumberMax)
          return false

        if (tiraj < product.TGO_FNumberMin)
          return false
      }

      return true
    },


    option_CanSale(salePage, product, option) {
      let ret = true
      if (salePage && product && option) {
        const selectedChild = this.getAnySet(salePage, option.TD_FID)
        if (selectedChild) {
          const productOptionValues = salePage.productsOptionValue.filter(pov => pov.TGPV_FID_Value == selectedChild.TD_FID && pov.TGPV_FID_Product == product.TGO_FID)

          productOptionValues.forEach(productOptionValue => {
            const relatedGood = salePage.relatedGoods.find(p => p.TGO_FID == productOptionValue.TGPV_FID_Goods)
            if (relatedGood) {
              if (relatedGood.TGO_FCanSale == 0)
                ret = false
            }
          })
        }
      }
      return ret
    },
    optionValue_CanSale(salePage, product, optionValue) {
      let ret = true
      if (salePage && product && optionValue) {
        const productOptionValues = salePage.productsOptionValue.filter(pov => pov.TGPV_FID_Value == optionValue.TD_FID && pov.TGPV_FID_Product == product.TGO_FID)

        productOptionValues.forEach(productOptionValue => {
          const relatedGood = salePage.relatedGoods.find(p => p.TGO_FID == productOptionValue.TGPV_FID_Goods)
          if (relatedGood) {
            if (relatedGood.TGO_FCanSale == 0)
              ret = false
          }
        })
      }
      return ret
    },
    optionValue_isActive(salePage, product, optionValue) {
      let ret = true
      if (salePage && product && optionValue) {
        const productOptionValues = salePage.productsOptionValue.filter(pov => pov.TGPV_FID_Value == optionValue.TD_FID && pov.TGPV_FID_Product == product.TGO_FID)

        productOptionValues.forEach(productOptionValue => {
          const relatedGood = salePage.relatedGoods.find(p => p.TGO_FID == productOptionValue.TGPV_FID_Goods)
          if (relatedGood) {
            if (relatedGood.TGO_FActive == 0)
              ret = false
          }
        })
      }
      return ret
    },
    optionValue_showInProducts(salePage, product, optionValue) {
      let ret = true
      if (salePage && product && optionValue) {
        const productOptionValues = salePage.productsOptionValue.filter(pov => pov.TGPV_FID_Value == optionValue.TD_FID && pov.TGPV_FID_Product == product.TGO_FID)

        productOptionValues.forEach(productOptionValue => {
          const relatedGood = salePage.relatedGoods.find(p => p.TGO_FID == productOptionValue.TGPV_FID_Goods)
          if (relatedGood) {
            if (relatedGood.TGO_FArchive == 0)
              ret = false
          }
        })
      }
      return ret
    },
  }
};
