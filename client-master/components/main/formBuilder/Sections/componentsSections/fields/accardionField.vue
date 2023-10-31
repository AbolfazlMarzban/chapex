<template>
  <div>
    <label for="" v-if="isadmin">آکاردئون</label>
    <v-expansion-panels style="border-radius: 20px !important">
      <template v-for="item, i in element.items">
        <v-expansion-panel v-if="item.TFF_FDelete == 0" class="faq-box my-2 pa-0" :key="i">
          <v-expansion-panel-header>
            - {{ item.title }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div v-html="item.value">

            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </template>

    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  props: ["element", "readonly", "isadmin"]
}
</script>

<style lang="scss">
.faq-box {
  border-radius: 20px !important;

  .v-expansion-panel-header {
    border-radius: 20px;
  }

  ::before {
    box-shadow: none !important;
  }

  ::after {
    display: none !important;
  }

  button {
    color: #016670;
    font-family: boldbakhtiari !important;

    .v-expansion-panel-header__icon {
      display: none;
    }
  }

  .v-expansion-panel-content {
    font-family: bakhtiari !important;
    border-radius: 20px;
    font-size: 16px;
  }

  p {
    padding: 0;
  }
}
</style>