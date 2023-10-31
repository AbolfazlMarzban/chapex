<template>
    <v-col cols="6" xl="6" lg="6" md="6" sm="12" xs="12" class="text-left">
        <v-dialog v-model="dialogPayIncrease" width="400">
            <template v-slot:activator="{ on, attrs }">
                <v-icon class="gr-color fns-16 fn-bold" v-bind="attrs" v-on="on">
                    افزایش موجودی
                </v-icon>
            </template>

            <v-card style="border-radius: 20px;">
                <v-card-title class="bgcolor-mid-silver">
                    <div style="min-width:100%;">
                        <v-row>
                            <v-col cols="6">
                                <div class="popup-title">
                                    افزایش موجودی
                                </div>
                            </v-col>
                            <v-col cols="6" class="text-left">
                                <div class="user-opinion float-left">
                                    <div class="" text @click="dialogPayIncrease = false">
                                        <v-icon class="cursor-pointer">mdi-close-thick</v-icon>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                </v-card-title>

                <v-card-text><br />

                    <!-- start user-opinion -->
                    <div class="user-opinion">
                        <p class="text-center fns-16">
                            شما میتوانید حساب خود را شارژ کرده و برای تامین مبلغ خرید
                            های آتی خود از آن استفاده نمایید.
                        </p>
                        <v-row class="align-center">
                            <v-col cols="8" lg="9" md="9">
                                <input type="text" class="form-control fns-14 " placeholder="مبلغ را وارد نمایید"
                                    style="height:40px" />
                            </v-col>
                            <v-col cols="4" lg="3" md="3" class="ma-0 pa-0 align-center">
                                <div class="btn-chr">شارژ حساب</div>
                            </v-col>
                        </v-row>
                    </div>
                    <!-- end user-opinion -->
                </v-card-text>

                <v-card-actions class="d-none">
                    <v-spacer></v-spacer>
                    <div class="user-opinion">
                        <div class="" text @click="dialogPayIncrease = false">
                            <v-icon>mdi-close-thick</v-icon>
                        </div>
                    </div>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-col>
</template>

<script>

export default {
    data() {
        return {
            dialogPayIncrease: false
        }
    }
}
</script>