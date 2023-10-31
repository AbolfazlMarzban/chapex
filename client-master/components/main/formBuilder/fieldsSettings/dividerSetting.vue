<template>
    <div>
        <v-row>

            <v-col cols="12" class="py-1 px-3">
                <v-row>
                    <v-col cols="8">
                        <v-slider label="عرض" min="1" max="100" v-model="data.TFF_FPlaceHolder"></v-slider>
                    </v-col>
                    <v-col cols="3">
                        <ui-input class="" v-model="data.TFF_FPlaceHolder" />
                    </v-col>
                    <v-col cols="">
                        <span>%</span>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12" class="py-1 px-3">
                <v-row>
                    <v-col cols="8">
                        <v-slider min="1" max="30" label="ضخامت" v-model="data.TFF_FDefault"></v-slider>
                    </v-col>
                    <v-col cols="3">
                        <ui-input class="" v-model="data.TFF_FDefault" />
                    </v-col>
                    <v-col cols="1">
                        <span>px</span>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="6" class="py-1 px-3">
                <ui-input class="form_control_textInput" label="ستون" v-model="data.TFF_FColumn" />
            </v-col>
            <v-col cols="6" class="py-1 px-3">
                <ui-input class="form_control_textInput" label="ترتیب" v-model="data.TFF_FOrder" />
            </v-col>


            <v-col cols="6" class="py-1 px-3">
                <v-checkbox label="فعال" v-model="data.TFF_FActive"></v-checkbox>
            </v-col>

        </v-row>
    </div>
</template>
  
<script>
export default {
    props: ["data"],
};
</script>
  
<style lang="scss">

</style>
  