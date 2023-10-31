export default {
  data() {
    return {
      paymentData: {
        TP_FID_Type: null,
        TP_FID_Payment: null,
        TP_FID_Bank: null,
        TP_FPrice: 0,
        legalInfo: [],
        acceptRules: '',
        printFactor: false,
        finalizeOrderRequested: false,

        // {
        //   TUX_FType: null,
        //   TUX_FName: null,
        //   TUX_FShenas: null,
        //   TUX_FMelli: null,
        //   TUX_FEcoCode: null,
        //   TUX_FTel: null,
        //   TUX_FAddress: null,
        // }
        // discountCode: '',
        // userCredit: '',
        // paymentMethod: null,
        // factorLegalOrPerson: null,
        // printFactor: '',
        // gateWay: null
      },
      // bankAccount: []
    }
  }
}