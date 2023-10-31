<template>
    <div>
        <v-btn
            style="width:100%; 
            background: #016670;
            border-radius: 20px;"
            dark
            :color="element.TFF_FLenMax"
           :placeholder="element.TFF_FPlaceHolder"
            :readonly="element.TFF_FActive == 0"
            :required="element.TFF_FRequired"
            v-model="element.TFF_FDefault"            
            :append-icon="element.TFF_FIcon" 
            :text="element.TFF_FToolTip"
        >
            <v-icon
                :color="element.TFF_FLenMin"
            >
            {{element.TFF_FIcon}}
            </v-icon>
            {{element.TFF_FPlaceHolder}}
        </v-btn>
    </div>
</template>
<script>
export default {
     props: ["element", "readonly"],
    mounted() {
        if(this.element){
            // console.log("log btn", this.element);
        }
    }
}
</script>