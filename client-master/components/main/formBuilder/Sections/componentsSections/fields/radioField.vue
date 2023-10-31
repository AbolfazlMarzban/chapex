<template>
    <div>
        <label>{{element.TFF_FLable}}</label>
        <v-radio-group
        :readonly="!element.TFF_FActive"
            :required="element.TFF_FRequired"
            v-model="element.TFF_FDefault" 
            :append-icon="element.TFF_FIcon" 
            :hint="element.TFF_FToolTip" 
        >
            <template v-for="(radio, index) in element.items">
                <v-radio v-if="radio.TFF_FDelete==0" :key="index" :label="radio.title" :value="radio.value" :readonly="readonly">
                </v-radio>
            </template>
        </v-radio-group>
    </div>
</template>

<script>
export default {
    props: ["element", "readonly"]
}
</script>