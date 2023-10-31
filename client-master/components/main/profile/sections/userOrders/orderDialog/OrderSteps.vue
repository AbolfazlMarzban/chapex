<template>
    <v-expansion-panel>
        <v-expansion-panel-header>
            گزارش زمانی مرحله به مرحله</v-expansion-panel-header>
        <v-expansion-panel-content>
            <ul>
                <li v-for="step, i in steps" :key="i">
                    <span>{{ step.TOS_FDateReg }} --</span>
                    <span>{{ step.TOS_TimeReg }} :</span>
                    <span style="color: #016670; font-weight: bold;">{{ step.TOS_FStatusName2 }}</span>
                </li>
            </ul>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>

export default {
    props: ["steps"],
}
</script>