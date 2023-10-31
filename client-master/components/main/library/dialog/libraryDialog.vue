<template>
  <div>
    <v-btn color="#016670" dark rounded @click="show=true" class="mb-4">
        {{ exported ? 'تغییر فایل' : 'فایل خود را انتخاب کنید' }}
    </v-btn>
    <v-dialog v-model="show">
        <v-card>
            <v-card-title class="flex-column justify-center pt-4">
                <div class="text-left px-4" style="width: 100%;">
                    <v-icon color="red" @click="show = false">mdi-close</v-icon>
                </div>
                <label for="">کتابخانه</label>
                <hr style="width: 95%;">
            </v-card-title>
            <v-card-text>
                <library :isAdmin="isAdmin" :isDialog="true" :multiple="multiple" @exportSelected="value => exportSelected(value)" :selectedFiles="selectedFiles"/>
            </v-card-text>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
import "../../../../assets/style/goods/goodsDialogs.scss";
export default {
props:["isAdmin", "multiple", "selected"],
data(){
    return{
        show: false,
        exported: null,
        selectedFiles: []
    }
},
mounted(){
    if(this.selected && this.selected.length > 0){
        this.exported = this.selected
        this.selectedFiles = this.selected
        // console.log('exported', this.exported)
    }
},
methods:{
    exportSelected(value){
        this.exported = value
        this.$emit('export', value)
        this.show = false
    }
},
watch:{
    selected(newValue){
        // console.log('library selected', newValue)
        this.exported = newValue
        this.selectedFiles = newValue
    }
}
}
</script>

<style>

</style>