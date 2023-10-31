<template>
    <div>
        <v-row>

            <v-col cols="12" class="py-1 px-3">
                <ui-editor value="data.TFF_FComment" v-model="data.TFF_FComment">
                </ui-editor>
            </v-col>

            <v-col cols="12" class="py-1 px-3">
                <ui-input class="form_control_textInput" label="عنوان" v-model="data.TFF_FLable" />
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
  