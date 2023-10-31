<template>
    <div>
        <v-text-field type="number" class="centered-input" label="تعداد های قابل انتخاب" v-model.number="itemTemp"
            @keyup.enter="addItem" :disabled="readonly"></v-text-field>
        <span style="font-size: 10px">پس از ورود Enter بزنید</span>
    </div>
</template>

<script>
export default {
    props: ["items", "readonly"],
    data() {
        return {
            itemTemp: "",
        }
    },
    methods: {
        addItem() {
            this.items.push(Number(this.itemTemp));
            this.itemTemp = "";
            this.items.sort((a, b) => a - b)
        },
    }
}
</script>