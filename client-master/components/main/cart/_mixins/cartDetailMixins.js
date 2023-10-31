export default {

    methods: {

        async getInit() {
            try {
                const response = await this.$authAxios.$get(
                    `/cart/getInit`
                )
                return response.data
            } catch (error) {
                console.log(error)
            }
        },

        async getCartData() {
            try {
                const response = await this.$authAxios.$get(`/cart/get/`)

                if (response) {
                    // this.$store.dispatch('cart/setCartData', response.data)

                    return response.data;
                }
            }
            catch (error) {
                console.log(error);
            }
        },

        async deleteCartItem(rowId) {
            try {
                const response = await this.$authAxios.$delete(
                    `/cart/delete/${rowId}`
                )

                if (response) {
                    this.$store.dispatch('login/initCartItems')
                }

                return response
            } catch (error) {
                console.log(error)
            }
        },

        async addToFutureCart(rowId) {
            try {
                const response = await this.$authAxios.$patch(
                    `/cart/set/1/${rowId}`
                )
                return response;

            } catch (error) {
                console.log(error)
            }
        },

        async backToCurrentCart(rowId) {
            try {
                const response = await this.$authAxios.$patch(
                    `/cart/set/0/${rowId}`
                )
                return response;

            } catch (error) {
                console.log(error)
            }
        },

        async changeCartBasketId(basketId, itemRowId, data, state) {
            try {
                const response = await this.$authAxios.$patch(
                    `/cart/set/${basketId}/${itemRowId}?state=${state}`, {
                    data
                }
                )
                return response;

            } catch (error) {
                console.log(error)
            }
        },

        async addToCart(basketId, cartObj, goDesignStatus, goToCart) {

            try {

                const response = await this.$authAxios.$post(`/cart/`, { data: cartObj })
                if (response) {
                    this.showResponseSuccessMessages(response)
                    this.$store.dispatch('login/initCartItems')

                    if (goToCart)
                        this.$router.push("/cart");

                    if (goDesignStatus)
                        this.$router.push("/designstatus");
                }
                else {
                    this.showResponseErrors(response)
                }

            } catch (error) {
                console.log(error)
            }
        },

        async updateCartItem(salePage, item, goDesignStatus, goToCart) {

            try {

                item.TOD_FPrice = this.calcPriceInCart(salePage, item.TOD_FID_Goods, item.TOD_FID_SelectedOptions,
                    item.TOD_FCount, 1)

                const response = await this.$authAxios.$post(`/cart/update`, { data: item })
                if (response) {

                    if (goToCart)
                        this.$router.push("/cart");

                    if (goDesignStatus)
                        this.$router.push("/designstatus");

                    return response
                }
                else {
                    this.showResponseErrors(response)
                }

            } catch (error) {
                console.log(error)
            }
        },

        getSalePage(cartData, salePageId) {
            if (cartData && cartData.salePages)
                return cartData.salePages.find(sp => sp.TPS_FID == salePageId)
        },

        getSalePagePicture(salePage) {
            if (salePage && salePage.gallery && salePage.gallery.length > 0) {

                if (salePage.TPS_FID_IndexImage)
                    return salePage.gallery.find(p => p.TPIC_FID == salePage.TPS_FID_IndexImage)

                return salePage.gallery[0]
            }
        },

        // async getShow(){
        //     try{
        //         const response = this.$authAxios.$get(
        //             "/faq/get/:id/:statusID?mode=show"
        //         )
        //         return response
        //     }catch(error) {
        //         console.log(error);
        //     }
        // } , 

        // async submitChangeState(data){
        //     try{
        //         let result = this.$authAxios.$patch("/faq/state" , {
        //             data
        //         })
        //         if(result) {
        //             return result;
        //         }
        //     }catch(error){
        //         console.log(error)
        //     }
        // } , 

        // async doLike(data){
        //     try{
        //         let result = await this.$authAxios.$post("/like" , {
        //             data : data
        //         })
        //         if (result) { 
        //             console.log("aaaa")
        //         }

        //     }catch(error) {
        //         console.log(error);
        //     }
        // } ,

        // async sendRowTypeToGetLikes(data){
        //     try {
        //         await this.$authAxios.$post("/like/type" , {
        //             rowType : data
        //         })

        //         const result = await this.$authAxios.$get("/like/type");

        //         return result

        //     }catch(error){
        //         console.log(error);
        //     }
        // },

        // async disLike (data){
        //     try{
        //         const result = await this.$authAxios.$post("/like/delete" , {
        //                likedId : data     
        //         });
        //     }catch(error){
        //         console.log(error);
        //     }
        // }
    },
}

