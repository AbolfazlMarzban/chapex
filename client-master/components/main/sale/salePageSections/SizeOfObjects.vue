<template>
    <v-container style="direction: ltr;" v-if="CheckUserAccess([11002])">
        <!-- <v-row v-for="index, object in Object.keys(objects)">
            <v-col cols="2">{{ index }}</v-col>
            <v-col cols="4">{{ object }}</v-col>
            <v-col cols="4">{{ sizeof(objects[object]) }}</v-col>
        </v-row> -->
    </v-container>
</template>


<script>
// import sizeof from 'object-sizeof'

export default {
    props: ["objects"],

    mounted() {
        // Object.keys(this.objects).forEach(obj => {
        //     let size = sizeof(this.objects[obj])
        //     let sizeStr = size + " B"
        //     if (size > 1024)
        //         sizeStr = (size / 1024).toFixed(0) + " KB"

        //     console.log('sizeof ' + obj + " is " + sizeStr);
        // })
    }
}
</script>