<template>
    <v-row>
        <v-col cols="12">

            <v-btn v-if="readonly" @click="$emit('edit')" dark color="rgba(1, 102, 112, 0.8)" elevation="2"
                class="float-left mx-1">
                <v-icon color="white">mdi-marker</v-icon>
                <span class="white--text mr-2">ویرایش</span>
            </v-btn>

            <v-btn v-if="!readonly && showCancel" @click="$emit('cancel')" dark color="pink" elevation="2" class="float-left mx-1">
                <v-icon color="white">mdi-marker-cancel</v-icon>
                <span class="white--text mr-2">انصراف</span>
            </v-btn>


            <v-btn v-if="selected && selected.length > 0" @click="$emit('select')" dark color="green" elevation="2" class="float-left mx-1">
                <v-icon color="white">mdi-check</v-icon>
                <span class="white--text mr-2">انتخاب</span>
            </v-btn>

            <v-btn v-if="!readonly" @click="$emit('submit')" dark color="rgba(1, 102, 112, 0.8)" elevation="2"
                class="float-left mx-1">
                <v-icon color="white">mdi-content-save-outline</v-icon>
                <span class="white--text mr-2">ذخیره</span>
            </v-btn>

        </v-col>
    </v-row>
</template>

<script>

export default {
    props: ["readonly", "showCancel", "selected"],
}
</script>