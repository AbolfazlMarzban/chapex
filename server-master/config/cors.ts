
let CorsOptions = {
  Local: {
    origin: "http://localhost:8080",
    optonsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true
  },
  saeid: {
    origin: "http://localhost:8080",
    optonsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true
  },
  saeidLaptop: {
    origin: "http://localhost:8080",
    optonsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true
  },
  sonyLaptop: {
    origin: "http://localhost:8080",
    optonsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true
  },
  liara: {
    origin: "https://chapex.ir",
    // origin: "http://localhost:8080",
    optonsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true
  },
  LocalAmir: {
    origin: "http://localhost:8080",
    optonsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true
  },
  Chapex: {
    origin: "*",
    optonsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true
  },
  Oloomco: {
    origin: "https://oloomco.ir",
    optonsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true
  },
}

export default CorsOptions