
let DatabaseOptions = {

  // Local: {
  //  server: "VUE-PC\\MSSQL2014",
  //  database: "DB_Rayan",
  //  user: "sa",
  //  password: "Mssql2014",
  //  options: {
  //    "enableArithAbort": true,
  //    encrypt: false,
  //  }, 
  // },
  // Local: {
  //   server: "94.232.174.176",
  //   database: "_DB_Rayan_Chapex",
  //   user: "Rayan_Chapex",
  //   password: "Mssql2012$@",
  //   options: {
  //     "enableArithAbort": true,
  //     encrypt: false,
  //   }, 
  // },
  Local: {
    server: "DESKTOP-S68ASQR\\LOCALHOST",
    // server: "DESKTOP-AU9OBB3\\LOCALHOST",
    database: "_DB_Rayan_Chapex2",
    user: "sa",
    password: "123456",
    options: {
      "enableArithAbort": true,
      encrypt: false,
    },
  },
  saeid: {
    server: "DESKTOP-Q65CPUT\\SQLEXPRESS",
    database: "chapexdb",
    user: "sa",
    password: "123456",
    options: {
      "enableArithAbort": true,
      encrypt: false,
      trustServerCertificate: true,
    },
  },
  saeidLaptop: {
    server: "ASUS-LAPTOP\\SQLEXPRESS2017",
    port: 1433,
    database: "chapex",
    user: "sa",
    password: "123456",
    options: {
      "enableArithAbort": true,
      encrypt: false,
      trustServerCertificate: true,
    },
  },
  sonyLaptop: {
    server: "DESKTOP-8C5AL1U\\SQLEXPRESS2017",
    port: 1433,
    database: "chapex",
    user: "sa",
    password: "123456",
    options: {
      "enableArithAbort": true,
      encrypt: false,
      trustServerCertificate: true,
    },
  },
  liara: { 
    server: "chapexdb",
    port: 1433,
    database: "chapexdb",
    user: "sa",
    password: "iu6Kec59tHdqxRSXPFJDn60y",
    options: {
      "enableArithAbort": true,
      encrypt: false,
    },
  },

  LocalAmir: {
    server: "DESKTOP-1PBJJ24\\SQL2014",
    database: "DB_Rayan",
    user: "sa",
    password: "Mssql2014",
    options: {
      "enableArithAbort": true,
      encrypt: false,
    },
  },
  Chapex: {
    server: "94.232.174.176",
    database: "_DB_Rayan_Chapex",
    user: "Rayan_Chapex",
    password: "Mssql2012$",
    options: {
      "enableArithAbort": true,
      encrypt: false,
    },
  },
  Oloomco: {
    server: "94.232.174.176",
    database: "_DB_Rayan",
    user: "Rayan",
    password: "4cb2M8!v",
    options: {
      "enableArithAbort": true,
      encrypt: false,
    },
  }
}

export default DatabaseOptions