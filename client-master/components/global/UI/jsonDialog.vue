<template>
    <div class="text-center">
        <v-dialog persistent v-model="dialog" width="500" class="goods_dialogs_main">
            <v-card class="goods_dialog" dir="ltr">
                <v-card-title>
                    <v-btn text @click="$emit('hiddenDialog')" class="goods_dialog_btn mt-4">
                        بستن
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <div>Page json object:</div>
                    <vue-json-pretty :data="object" :showLine="true" :showIcon="true" :showLineNumber="false"
                        :itemHeight="18" :deep="1" />
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>


export default {
    props: ["object"],
    data() {
        return {
            dialog: true,
        }
    }
}
</script>