<template>
    <v-expansion-panel>
        <v-expansion-panel-header style="box-shadow: none !important">
            وضعیت طراحی

            <v-chip v-if="data.TOD_FID_LastStatusDetail == 2450401" color="red" class="mx-2"
                style="max-width: 120px; cursor: pointer;">
                <span class="white--text">{{ data.TOD_FID_LastStatusDetailName }}</span>
            </v-chip>

            <v-chip v-if="data.TOD_FID_LastStatusDetail == 2450402" color="red" class="mx-2"
                style="max-width: 200px; cursor: pointer;">
                <span class="white--text">{{ data.TOD_FID_LastStatusDetailName }}</span>
            </v-chip>

            <v-chip v-if="data.TOD_FID_LastStatusDetail == 2450301" color="red" class="mx-2"
                style="max-width: 200px; cursor: pointer;">
                <span class="white--text">{{ data.TOD_FID_LastStatusDetailName }}</span>
            </v-chip>

            <v-chip v-if="data.TOD_FID_LastStatusDetail == 2450305" color="red" class="mx-2"
                style="max-width: 130px; cursor: pointer;">
                <span class="white--text">{{ data.TOD_FID_LastStatusDetailName }}</span>
            </v-chip>

        </v-expansion-panel-header>

        <v-expansion-panel-content>

            <v-card elevation="2" class="pa-3 ma-3 text-center" color="pink lighten-4"
                v-if="data.TOD_FID_LastStatusDetail == 2450401">
                <div class="my-3">جهت ادامه فرایند سفارش فایل های طراحی خود را آپلود نمایید</div>

                <v-btn @click="$router.push(`/profile/orders/${data.TOD_FID}/upload`)" dark color="pink lighten-1"
                    elevation="2" class="mx-2">
                    <v-icon color="white">mdi-cloud-upload-outline</v-icon>
                    <span class="white--text mr-2">آپلود فایل</span>
                </v-btn>
            </v-card>

            <v-card elevation="2" class="pa-3 ma-3 text-center" color="pink lighten-4"
                v-else-if="data.TOD_FID_LastStatusDetail == 2450402">
                <div class="my-3">فایل های آپلود شده مورد تایید نمیباشند. لطفا فایل های جدید طراحی خود را آپلود نمایید</div>
                <div class="my-3">توضیحات ناظر: {{ data.TOD_FLastStatusComment }}</div>
                <v-btn @click="$router.push(`/profile/orders/${data.TOD_FID}/upload`)" dark color="pink lighten-1"
                    elevation="2" class="mx-2">
                    <v-icon color="white">mdi-cloud-upload-outline</v-icon>
                    <span class="white--text mr-2">آپلود فایل</span>
                </v-btn>
            </v-card>

            <v-card elevation="2" class="pa-3 ma-3 text-center" color="pink lighten-4"
                v-else-if="data.TOD_FID_LastStatusDetail == 2450301">
                <div class="my-3">جهت سفارش طراحی پرشسنامه مربوطه را تکمیل نمایید</div>

                <v-btn @click="$router.push(`/profile/orders/${data.TOD_FID}/design`)" dark color="pink lighten-1"
                    elevation="2" class="mx-2">
                    <v-icon color="white">mdi-form-textarea</v-icon>
                    <span class="white--text mr-2">تکمیل فرم پرسشنامه طراحی</span>
                </v-btn>
                <!-- <LazyFormViewer :FID="data.TOD_FID_DesignForm" :readonly="false" /> -->
            </v-card>

            <v-card elevation="2" class="pa-3 ma-3 text-center" color="pink lighten-4"
                v-else-if="data.TOD_FID_LastStatusDetail == 2450305">
                <div class="my-3">فایل نهایی طراحی خود را تایید کنید</div>
                <!-- <LazyFormViewer :FID="data.TOD_FID_DesignForm" :readonly="false" /> -->
            </v-card>

            <v-card elevation="2" class="pa-3 ma-3 text-center" color="green lighten-4"
                v-else-if="data.TOD_FID_LastStatus == 24503 || data.TOD_FID_LastStatus == 24504">
                <div class="my-3">سفارش شما {{ data.TOD_FID_LastStatusDetailName }} میباشد</div>
            </v-card>

            <v-card elevation="2" class="pa-3 ma-3 text-center" color="green lighten-4" v-else>
                <div class="my-3">سفارش شما در مرحله {{ data.TOD_FID_LastStatusName }} میباشد</div>
            </v-card>

        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
export default {
    props: ["data"],
}
</script>