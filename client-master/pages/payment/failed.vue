<template>
  <div>
    <v-row class="justify-center align-center my-16">
      <v-col cols="8">
        <v-card style="border-radius: 20px;">
          <v-card-title></v-card-title>
          <v-card-text class="text-center">
            <div class="d-flex flex-column align-center">
              <svg id="close" xmlns="http://www.w3.org/2000/svg" width="83.656" height="83.656"
                viewBox="0 0 83.656 83.656">
                <g id="Group_221" data-name="Group 221">
                  <path id="Path_102" data-name="Path 102"
                    d="M81.293,83.656H2.363A2.363,2.363,0,0,1,0,81.293V56.007a2.363,2.363,0,1,1,4.726,0V78.93h74.2V4.726H56.007a2.363,2.363,0,0,1,0-4.726H81.293a2.363,2.363,0,0,1,2.363,2.363v78.93A2.364,2.364,0,0,1,81.293,83.656Z"
                    fill="#b3404a" />
                  <path id="Path_103" data-name="Path 103"
                    d="M2.363,44.191A2.363,2.363,0,0,1,0,41.828V2.363A2.363,2.363,0,0,1,2.363,0H41.828a2.363,2.363,0,0,1,0,4.726H4.726v37.1A2.363,2.363,0,0,1,2.363,44.191Z"
                    fill="#b3404a" />
                  <path id="Path_104" data-name="Path 104"
                    d="M63.109,95.012a2.363,2.363,0,0,1-2.363-2.363V63.109a2.363,2.363,0,0,1,2.363-2.363h29.54a2.363,2.363,0,1,1,0,4.726H65.472V92.649A2.363,2.363,0,0,1,63.109,95.012Z"
                    transform="translate(-50.821 -50.821)" fill="#b3404a" />
                </g>
                <path id="Path_105" data-name="Path 105"
                  d="M173.447,164.542l-11.131-11.131,11.131-11.131-8.9-8.9-11.131,11.131L142.28,133.375l-8.9,8.9,11.131,11.131-11.131,11.131,8.9,8.9,11.131-11.131,11.131,11.131Z"
                  transform="translate(-111.583 -111.583)" fill="#f4b2b0" />
                <path id="Path_106" data-name="Path 106"
                  d="M152.44,163.71a2.356,2.356,0,0,1-1.671-.692l-9.46-9.46-9.46,9.46a2.364,2.364,0,0,1-3.342,0l-8.9-8.9a2.363,2.363,0,0,1,0-3.342l9.46-9.46-9.46-9.46a2.363,2.363,0,0,1,0-3.342l8.9-8.9a2.364,2.364,0,0,1,3.342,0l9.46,9.46,9.46-9.46a2.364,2.364,0,0,1,3.342,0l8.9,8.9a2.363,2.363,0,0,1,0,3.342l-9.46,9.46,9.46,9.46a2.363,2.363,0,0,1,0,3.342l-8.9,8.9A2.355,2.355,0,0,1,152.44,163.71Zm-11.131-15.857a2.356,2.356,0,0,1,1.671.692l9.46,9.46L158,152.442l-9.46-9.46a2.363,2.363,0,0,1,0-3.342l9.46-9.46-5.563-5.563-9.46,9.46a2.364,2.364,0,0,1-3.342,0l-9.46-9.46-5.563,5.563,9.46,9.46a2.363,2.363,0,0,1,0,3.342l-9.46,9.46L130.178,158l9.46-9.46A2.356,2.356,0,0,1,141.309,147.852Z"
                  transform="translate(-99.481 -99.482)" fill="#b3404a" />
              </svg>

              <label for="" class="fn-bold fns-18 mt-3" style="color: #016670;">متأسفانه پرداخت شما ناموفق بود</label>
            </div>

            <hr />
            <v-row class="justify-center">
              <v-col cols="4" class="d-flex flex-column">
                <!-- <span class="fns-16 fn-bold">شماره پیگیری:</span> -->
                <span class="fns-16 fn-bold">شیوه پرداخت:</span>
              </v-col>
              <v-col cols="4" class="d-flex flex-column">
                <span class="fns-16 fn-bold">درگاه پرداخت آنلاین</span>
                <span class="fns-16 fn-bold">{{ gateway }}</span>
              </v-col>
            </v-row>
            <hr />
            <div class="d-flex flex-row justify-center">
              <v-btn rounded depressed color="#016670" dark @click="payAgain()" class="mx-2">پرداخت
                مجدد</v-btn>
              <v-btn rounded depressed color="#016670" dark @click="$router.push('/payment')" class="mx-2">تغییر روش
                پرداخت</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  middleware: ["init-auth", "is-auth", "init-cart"],
  layout: "mainOrg",

  computed: {
    gateway() {
      const gate = this.$route.query.gateway
      switch (gate) {
        case 'zp':
          return 'زرین پال'

        case 'sep':
          return 'بانک سامان'

        default:
          return ''

      }
    },
  },

  methods: {
    payAgain() {
      const authority = this.$route.query.authority
      if (authority) {
        const gate = this.$route.query.gateway
        switch (gate) {
          case 'zp':
            window.location.href = `https://www.zarinpal.com/pg/StartPay/${authority}`;
            break

          case 'sep':
            this.$router.push('/payment')
            break

          default:
            this.$router.push('/payment')
            break

        }
      }
    }
  }
};
</script>

<style scoped>
.orderIdText {
  font-size: 24px;
  color: red;
}

.btn {
  cursor: pointer;
  color: blue;
}
</style>
