<template>
    <div v-if="address">
        <div>
            <i aria-hidden="true" class="v-icon notranslate mdi mdi-google-maps theme--light">
            </i>
            <span class="fns-14">آدرس تحویل گیرنده : {{ address.TUA_FID_City1Name }}
                - {{
                    address.TUA_FID_City2Name
                }} - {{ address.TUA_FAddress }}</span>
        </div>
        <i aria-hidden="true" class="v-icon notranslate mdi mdi-account theme--light">
        </i>
        <span class="fns-14">تحویل گیرنده : {{ address.TUA_FName }}</span>

        <i aria-hidden="true" class="v-icon notranslate mr-5 mdi mdi-phone theme--light">
        </i>
        <span class="fns-14">{{ address.TUA_FTell1 }}</span>
        <br />
    </div>
</template>

<script>

export default {
    props: ["address"],
}
</script>