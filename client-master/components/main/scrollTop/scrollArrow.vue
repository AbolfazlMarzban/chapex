<template>
    <v-fab-transition>
      <v-btn fixed right bottom fab color="#016670" small style="margin-bottom: 100px;" dark v-scroll="checkScroll" v-show="showFab" @click="goUP">
    <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-fab-transition>
    </template>
    
    <script>
    export default {
    data(){
        return{
            showFab: false
        }
    },
    methods:{
        checkScroll(){
            const h = window.scrollY
            if(h>300){
                this.showFab = true
            }else{
                this.showFab = false
            }
        },
        goUP(){
            this.$vuetify.goTo(0,{ 
                duration: 1000
            })
        }
    }
    }
    </script>
    
    <style>
    </style>