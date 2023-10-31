<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-expansion-panels style="border-radius: 20px !important">
          <v-expansion-panel v-for="item in data" :key="item.TFAQ_FID" class="faq-box my-2">
            <v-expansion-panel-header v-if="!item.TFAQ_FQuestion == ''">
             -           {{ item.TFAQ_FQuestion }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              {{ item.TFAQ_FAnswer }}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels> 
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
props:[ "data"]
}
</script>

<style lang="scss">
.faq-box{
  border-radius: 20px !important;
  .v-expansion-panel-header{
    border-radius: 20px;
  }
::before{
  box-shadow: none !important;
}
::after{
  display: none !important;
}
button{
  color: #016670;
  font-family: boldbakhtiari !important;
  .v-expansion-panel-header__icon{
    display: none;
  }
}
.v-expansion-panel-content{
  font-family: bakhtiari !important;
  border-radius: 20px;
}
}
</style>