<template>
    <div class="legal">
        <v-row>
            <v-col cols="12" class="d-flex">
                <h2 class="legal-info">اطلاعات رسمی (مالیاتی)</h2>
            </v-col>
        </v-row>

        <v-row class="form-row">
            <v-col xl="3" lg="3" md="3" sm="3" cols="12">
                <label>شخصیت تجاری</label>
                <v-select :items="['حقیقی', 'حقوقی']" class="pt-0 mt-0" v-model="type" @change="setType()"></v-select>
            </v-col>
            <v-col xl="3" lg="3" md="3" sm="3" cols="12">
                <ui-input v-if="type == 'حقوقی'" type="text" label="نام تجاری" placeholder="info@example.com"
                    class="form_control_textInput" v-model="data.name" />
                <ui-input v-else type="text" label="نام کامل" placeholder="نام کامل خود را وارد کنید"
                    class="form_control_textInput" v-model="data.name" />

            </v-col>
            <v-col xl="3" lg="3" md="3" sm="3" cols="12">
                <ui-input v-if="type == 'حقوقی'" type="number" label="شناسه ملی" class="form_control_textInput"
                    v-model="data.melli" />
                <ui-input v-else type="number" label="شماره ملی" class="form_control_textInput" v-model="data.melli" />

            </v-col>
            <v-col xl="3" lg="3" md="3" sm="3" cols="12">
                <ui-input v-if="type == 'حقوقی'" type="number" label="شماره ثبت" class="form_control_textInput"
                    v-model="data.shenas" />
                <ui-input v-else type="number" label="شماره شناسنامه" class="form_control_textInput"
                    v-model="data.shenas" />

            </v-col>
        </v-row>

        <v-row class="form-row">
            <v-col xl="4" lg="4" md="4" sm="4" cols="12">
                <ui-input type="number" label="کد اقتصادی" v-model="data.eghtesadi" class="form_control_textInput" />
            </v-col>
            <v-col xl="4" lg="4" md="4" sm="4" cols="12" class="d-flex flex-column">
                <label>نشانی</label>
                <span v-if="saveMode == 'edit'">{{ data.address }}</span>
                <v-row>
                    <v-col cols="10">
                        <v-select class="pt-0 mt-0" :items="address" v-model="data.address"
                            @change="setAddressId"></v-select>
                    </v-col>
                    <v-col cols="2">
                        <!-- <v-btn rounded dark color="#016670" class="px-2">نشانی جدید +</v-btn> -->
                        <a href="/profile/profile" target="_blank" style="color: #016670;">نشانی جدید+</a>
                    </v-col>
                </v-row>
            </v-col>
            <v-col xl="4" lg="4" md="4" sm="4" cols="12">
                <ui-input type="number" label="شماره تماس" class="form_control_textInput" placeholder="021-32511235"
                    v-model="data.phone" />
            </v-col>

            <ActionBar @edit="$emit('edit')" @cancel="cancel" :showCancel="showCancel" @submit="submit" />

            <v-col cols="12">
                <v-data-table item-key="TUX_FID" :items="table" :headers="legalHeaders" disable-pagination
                    hide-default-footer @click:row="selectRow" class="row-pointer">

                    <template v-slot:item.TUX_FType="{ item }">
                        <span style="cursor: pointer;">{{ showType(item.TUX_FType) }}</span>
                    </template>

                    <template v-slot:item.TUX_FName="{ item }">
                        <span style="cursor: pointer;">{{ item.TUX_FName }}</span>
                    </template>

                    <template v-slot:item.TUX_FMelli="{ item }">
                        <span style="cursor: pointer;">{{ item.TUX_FMelli }}</span>
                    </template>

                    <template v-slot:item.TUX_FShenas="{ item }">
                        <span style="cursor: pointer;">{{ item.TUX_FShenas }}</span>
                    </template>

                    <template v-slot:item.TUX_FEcoCode="{ item }">
                        <span style="cursor: pointer;">{{ item.TUX_FEcoCode }}</span>
                    </template>

                    <template v-slot:item.TUX_FTel="{ item }">
                        <span style="cursor: pointer;">{{ item.TUX_FTel }}</span>
                    </template>

                    <template v-slot:item.TUX_FAddress="{ item }">
                        <span style="cursor: pointer;">{{ item.TUX_FAddress }}</span>
                    </template>

                    <template v-slot:item.operation="{ item }">
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon v-on="on" v-bind="attrs" class="mx-2" style="cursor: pointer;"
                                    @click.stop="editTaxInfo(item)">mdi-pen</v-icon>
                            </template>
                            <span>ویرایش</span>
                        </v-tooltip>
                    </template>

                </v-data-table>
            </v-col>
        </v-row>
        
        <v-row v-if="warning">
            <v-col cols="12" class="text-center">
                <span class="fns-16">آیا از حذف اطلاعات مالیاتی {{ deadItem.name }} مطمئن هستید؟</span>
                <div class="mt-5">
                    <v-btn @click="deleteItem" class="mx-2" rounded depressed dark color="#016670">بله</v-btn>
                    <v-btn @click="warning = false" class="mx-2" rounded depressed dark color="red">خیر</v-btn>
                </div>
            </v-col>
        </v-row>
        <v-row v-if="error">
            <v-col cols="12">
                <span style="color: red;">لطفاً تمام فیلد ها را کامل کنید</span>
            </v-col>
        </v-row>

    </div>
</template>

<script>
import profileMixins from '../../../auth/addresses/_mixins/profileMixins';
import ActionBar from '../../../profile/sections/profile/ActionBar.vue';
export default {
    mixins: [profileMixins],
    components: { ActionBar },
    props: ["table"],
    mounted() {
        this.getAddress()
    },
    data() {
        return {
            data: {
                type: null,
                name: '',
                melli: '',
                shenas: '',
                eghtesadi: '',
                address: null,
                phone: '',
                addressID: null
            },
            address: [],
            type: null,
            error: false,
            saveMode: 'insert',
            showCancel: false,
            warning: false,
            deadItem: {},
            selected: [],
            addresses: []
        }
    },
    computed: {
        legalHeaders() {
            return [
                {
                    text: "شخصیت تجاری",
                    align: "center",
                    sortable: false,
                    value: "TUX_FType"
                },
                {
                    text: "نام / نام تجاری",
                    align: "center",
                    sortable: false,
                    value: "TUX_FName"
                },
                {
                    text: "شماره / شناسه ملی",
                    align: "center",
                    sortable: false,
                    value: "TUX_FMelli"
                },
                {
                    text: "شماره شناسنامه / شماره ثبت",
                    align: "center",
                    sortable: false,
                    value: "TUX_FShenas"
                },

                {
                    text: "کد اقتصادی",
                    align: "center",
                    sortable: false,
                    value: "TUX_FEcoCode"
                },
                {
                    text: "شماره تماس",
                    align: "center",
                    sortable: false,
                    value: "TUX_FTel"
                },
                {
                    text: "نشانی",
                    align: "center",
                    sortable: false,
                    value: "TUX_FAddress"
                },
                {
                    text: "عملیات",
                    align: "center",
                    sortable: false,
                    value: "operation"
                }
            ];
        },
    },
    methods: {
        setAddressId() {
            const adres = this.addresses.find(item => item.TUA_FAddress == this.data.address)
            this.data.addressID = adres.TUA_FID
        },
        async getAddress() {
            try {
                const res = await this.getAddressesInProfile("show")
                if (res) {
                    this.addresses = res.addressData
                    res.addressData.forEach(i => {
                        this.address.push(i.TUA_FAddress)
                    })
                }
            } catch (error) {
                console.log(error)
            }
        },
        setType() {
            if (this.type == 'حقیقی') {
                this.data.type = 0
            } else {
                this.data.type = 1
            }
        },
        async submit() {
            if (this.saveMode == 'insert') {
                try {
                    let keys = ['type', 'name', 'melli', 'shenas', 'eghtesadi', 'address', 'phone', 'addressID']
                    let checkdata = false
                    for (var i = 0; i < keys.length; i++) {
                        // console.log(this.data[keys[i]])
                        if (this.data[keys[i]] && this.data[keys[i]].length > 0) {
                            checkdata = true
                        } else {
                            checkdata = false
                        }
                    }
                    if (checkdata) {
                        this.error = false
                        const result = await this.$authAxios.$post('/tax', this.data)
                        if (result) {
                            this.showResponseSuccessMessages(result)
                            this.cancel()
                            // console.log(result)
                            // this.getTaxInfo()
                            this.$emit("getTax")
                        }
                    } else {
                        this.error = true
                    }
                } catch (error) {
                    console.log(error)
                }
            } else if (this.saveMode == 'edit') {
                try {
                    const result = await this.$authAxios.$post('/tax/update', this.data)
                    if (result) {
                        this.showResponseSuccessMessages(result)
                        this.cancel()
                        this.saveMode = 'insert'
                        // this.getTaxInfo()
                        this.$emit("getTax")
                    }
                } catch (error) {
                    console.log()
                }
            }
        },

        showType(item) {
            if (item == 0) {
                return 'حقیقی'
            } else {
                return 'حقوقی'
            }
        },

        editTaxInfo(item) {
            if (item.TUX_FType == 0) {
                this.type = 'حقیقی'
                this.data.type = 0
            } else {
                this.type = 'حقوقی'
                this.data.type = 1
            }
            this.data.name = item.TUX_FName
            this.data.melli = item.TUX_FMelli
            this.data.shenas = item.TUX_FShenas
            this.data.eghtesadi = item.TUX_FEcoCode
            this.data.address = item.TUX_FAddress
            this.data.phone = item.TUX_FTel
            this.data.id = item.TUX_FID

            this.saveMode = 'edit'
            this.showCancel = true
        },

        cancel() {
            this.data = {
                type: null,
                name: '',
                melli: '',
                shenas: '',
                eghtesadi: '',
                address: null,
                phone: ''
            }
            this.type = null
            this.showCancel = false
        },

        showWarn(item) {
            this.deadItem.name = item.TUX_FName
            this.deadItem.id = item.TUX_FID
            this.warning = true
        },

        async deleteItem() {
            try {
                if (this.deadItem.id) {
                    const result = await this.$authAxios.$delete(`/tax/delete/${this.deadItem.id}`)
                    if (result) {
                        this.showResponseSuccessMessages(result)
                        this.warning = false
                        this.deadItem = {}
                        // this.getTaxInfo()
                        this.$emit("getTax")
                    }
                }
            } catch (error) {
                console.log(error)
            }
        },
        
        selectRow(row) {
            this.selected = []
            this.selected.push(row)
            this.$emit("selectedLegal", this.selected)
        }
    }
}
</script>
<style lang="scss">
.v-list-item__title {
    font-family: bakhtiari;
}
</style>