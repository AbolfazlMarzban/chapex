<template>
    <div>
        <label for="" v-if="isadmin">متن</label>
    <div v-html="element.TFF_FComment"
    :readonly="!element.TFF_FActive"
            :required="element.TFF_FRequired"
            value="element.TFF_FDefault" 
            :append-icon="element.TFF_FIcon" 
            :hint="element.TFF_FToolTip" 
     class="mx-auto">
    </div>
    </div>
</template>

<script>
export default {
    props: ["element", "readonly", "isadmin"]
}
</script>