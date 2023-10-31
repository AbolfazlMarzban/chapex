<template>
    <div>
        <ui-input v-model="itemTemp" @keyup="addItem" class="optInput"></ui-input>
        <span style="font-size: 12px">پس از ورود Enter بزنید</span>
    </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {

    props: ["items", "optionId"],
    data() {
        return {
            itemTemp: "",
        }
    },
    methods: {
        addItem() {
            var obj = {
                TD_FID: uuidv4(),
                isNew: true,
                newlyAdded: true,
                TD_FID_Group: this.optionId,
                TD_FName: this.itemTemp,
                TD_FCaption: "",
                TD_FActive: 1,
                TD_FDelete: 0,
                TD_FOrder: this.items.length,
            };

            this.items.push(obj);

            this.itemTemp = "";
        },
    }
}
</script>