<template>
  <div>
    <v-row class="option_list_group">

      <v-col cols="11" class="cont addressBorder mt-3 mr-7" v-for="(address, index) in addressesList" :key="index">

        <v-radio-group>
          <v-row>
            <v-col cols="8" class="d-flex flex-column">
              <div class="float-right mr-right-minus">
                <!-- <div v-if="readonly">{{ address.TUA_FAddress }}</div> -->
                <!-- <v-radio v-else :label="address.TUA_FAddress" :value="address.TUA_FAddress"> -->
                <v-radio :label="address.TUA_FAddress" :value="address.TUA_FAddress">
                </v-radio>
              </div>


              <div class="d-flex justify-space-between mt-2">
                <div>
                  <v-icon>mdi-account</v-icon>
                  <span class="fns-16">تحویل گیرنده : {{ address.TUA_FName }}</span>

                  <v-icon class="mr-5">mdi-phone</v-icon>
                  <span class="fns-16">{{ address.TUA_FTell1 }}</span>
                </div>

              </div>
            </v-col>

            <v-col cols="4" class="d-flex align-center flex-row-reverse border-none">
              <span @click="editAnAddress(address.TUA_FID)" class="float-left gr-color cursor-pointer"> | <v-icon
                  class="gr-color fn-bold">mdi-pencil-box</v-icon></span>
              <span @click="deleteAddress(address.TUA_FID)" class="float-left gr-color cursor-pointer ml-2"> <v-icon
                  class="gr-color fn-bold">mdi-minus-thick</v-icon> </span>
            </v-col>
          </v-row>
        </v-radio-group>
      </v-col>
      <v-row class="mt-4">
        <v-col cols="11" class="mr-7">
          <div @click="openAddressForm" class="btn-order">افزودن ادرس جدید</div>
        </v-col>
      </v-row>
    </v-row>


    <v-dialog v-model="addressFormDialog" width="700" content-class="">
      <v-card class="submitComment_dialog">
        <v-card-title>
          <div style="min-width: 100%">
            <v-row class="submitComment_title">
              <v-col cols="6">
                <div class="popup-title"> آدرس</div>
              </v-col>
              <v-col cols="6" class="text-left">
                <div class="user-opinion float-left">
                  <div class="" text @click="addressFormDialog = false">
                    <v-icon>mdi-close-thick</v-icon>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-card-title>

        <v-card-text>

          <div class="user-opinion fns-16">
            <div class="row">
              <div xs="12" class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-12">
                <ui-select v-model="data.TUA_FID_City1" :items="defaults[123]" :options="{
                  fields: {
                    id: 'TD_FID',
                    name: 'TD_FName',
                    search: '',
                  },
                  label: ' استان ',
                  count: 10,
                }" />


                <!-- v-model="data.TGO_FID_Type" -->
                <!-- :items="defaults[207]" -->

              </div>


              <div xs="12" class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-12">
                <ui-select v-model="data.TUA_FID_City2" :items="defaults[124]" :options="{
                  fields: {
                    id: 'TD_FID',
                    name: 'TD_FName',
                    search: 'TD_FName',
                  },
                  label: ' شهر ',
                  count: 10,
                }" />
                <!-- v-model="data.TGO_FID_Type" -->
                <!-- :items="defaults[207]" -->
              </div>
            </div>
            <div class="row">

              <div xs="12" class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-12">
                <ui-select v-model="data.TUA_FID_Place" :items="defaults[123]" :options="{
                  fields: {
                    id: 'TD_FID',
                    name: 'TD_FName',
                    search: 'TD_FName',
                  },
                  label: 'مکان ',
                  count: 10,
                }" />
                <!-- v-model="data.TGO_FID_Type" -->
                <!-- :items="defaults[207]" -->
              </div>
              <div xs="12" class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-12">
                <ui-input v-model="data.TUA_FMapX" type="text" class="form_control_textInput" label="موقعیت روی نقشه   "
                  placeholder="" />
              </div>
            </div>

            <div class="row">
              <div class="col col-12">
                <ui-input type="text" v-model="data.TUA_FAddress" class="form_control_textInput" label="آدرس"
                  placeholder=" " />
              </div>
            </div>
            <div class="row">
              <div xs="12" class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-12">
                <ui-input v-model="data.TUA_FPlates" type="text" class="form_control_textInput" label="پلاک"
                  placeholder=" " />
              </div>
              <div xs="12" class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-12">
                <ui-input v-model="data.TUA_FUnit" type="text" class="form_control_textInput" label="واحد"
                  placeholder=" " />
              </div>
              <div xs="12" class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-12">
                <ui-input v-model="data.TUA_FPost" type="text" class="form_control_textInput" label="کدپستی"
                  placeholder=" " />
              </div>
            </div>
            <br><br>


            <div class="row">
              <div xs="12" class="text-right col-sm-12 col-md-12 col-lg-6 col-xl-6 col-12">
                <label class="gr-color fn-bold">اطلاعات تحویل گیرنده</label>
              </div>

              <div xs="12" class="text-left col-sm-12 col-md-12 col-lg-6 col-xl-6 col-12">
                <v-checkbox label="   استفاده از اطلاعات خودم " value="close" :disabled="readonly">
                </v-checkbox>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col col-6">
                <ui-input v-model="data.TUA_FName" type="text" class="form_control_textInput" label="نام و نام خانوادگی"
                  placeholder=" " />
              </div>
              <div class="col col-6">


              </div>
            </div>


            <div class="row">
              <div xs="12" class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-12">

                <ui-input v-model="data.TUA_FTell1" type="text" class="form_control_textInput" label="شماره همراه"
                  placeholder=" " />
              </div>
              <div xs="12" class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-12">
                <ui-input v-model="data.TUA_FCodeMeli" type="text" class="form_control_textInput" label="کد ملی"
                  placeholder=" " />
              </div>

            </div>

          </div>


        </v-card-text>
        <v-card-actions>
          <v-row>
            <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-12">

            </div>




            <div v-if="state == 'insert'" class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-12 delivery_btn">

              <div @click="submitAddress" class="btn-order">ثبت</div>
            </div>
            <div v-else-if="state == 'edit'" class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-12 delivery_btn">

              <div @click="submitAnAddressAfterEdit" class="btn-order">ثبت</div>
            </div>



          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import "../../../../assets/style/cart/cart.scss";
import "../../../../assets/style/commentForm/CommentForm.scss";
import userCustomerMixin from "./_mixins/userCustomerMixins";
import userCustomerVariables from "./_mixins/userCustomerVariables";

export default {
  mixins: [userCustomerMixin, userCustomerVariables],
  props: ["userId", "readonly"],
  data() {
    return {
      addressFormDialog: false,
      state: "insert",
    };
  },
  methods: {
    async submitUserAddress(userId) {
      try {
        const result = await this.submitUserAddressInUserCustomer(this.data, userId);
        if (result) {
          console.log("this addres has been registered successfully");
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getInitFormAddress() {
      try {
        const result = await this.getAddressesInUserCustomer("init");
        if (result) {
          this.defaults = result.defaults;
          this.data = result.form;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getAddresses(userId) {
      try {
        const result = await this.getAddressesInUserCustomer("show", userId);
        if (result) {
          this.addressesList = result.addressData;
          // console.log(this.addressesList);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async editAddress(addressRowId) {
      try {
        const result = await this.getAddressRowToEdit(addressRowId);
        if (result) {
          this.data = result.addressData;
          this.defaults = result.defaults;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async submitUserAddressAfterEdit() {
      try {
        const result = await this.submitAddressAfterEdit(this.data);
        if (result) {
          console.log("this addres has been registered successfully");
        }
      } catch (error) {
        console.log(error);
      }
    },

    async deleteAddressInUserCustomer(addressId) {
      try {
        const result = await this.deleteUserAddress(addressId);
        if (result) {
          console.log("address has been deleted");
        }
      } catch (error) {
        console.log(error);
      }
    },

    async submitAddress() {
      await this.submitUserAddress(this.userId);
      await this.getAddresses(this.userId);
      this.addressFormDialog = false;
    },


    openAddressForm() {
      this.state = "insert";
      this.getInitFormAddress();
      this.addressFormDialog = true;
    },
    async deleteAddress(addressRowId) {
      await this.deleteAddressInUserCustomer(addressRowId);
      await this.getAddresses(this.userId);
    },
    editAnAddress(addressRowId) {
      this.state = "edit";
      this.editAddress(addressRowId);
      this.addressFormDialog = true;
    },
    async submitAnAddressAfterEdit() {
      await this.submitUserAddressAfterEdit();
      await this.getAddresses(this.userId);
      this.addressFormDialog = false;
    },

  },

  mounted() {
    this.getAddresses(this.userId);
  },
};
</script>
