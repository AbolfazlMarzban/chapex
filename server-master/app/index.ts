import express, { Application, Request, Response, NextFunction } from 'express';

import bodyParser from 'body-parser'
import cors, { CorsOptions } from 'cors'
import helmet from 'helmet'
import shutdownServer from "./routes/shop/shutdownServer"


// routes
import routes from "./routes"

// middleware
import dbConnectionMiddleware from "./middleware/is-database-connected"

const App: Application = express()

class ApplicationServer {

  constructor() {
    this.helmetSetup();
    this.setBodyParserConfig();
    this.setCorsConfig();
    this.setStaticDirectories();
    this.errorHandler();
    this.setMulterCongif();
    this.setupRoutes();
    this.setupServer();
  }

  async setupServer() {


    App.listen(global.config.port)
    console.log('localhost: ' + global.config.port)
  }

  setupRoutes() {
    App.use(function (req: Request, res: Response, next: NextFunction) {
      res.setHeader("Content-Type", "application/json");
      next();
    });

    App.use("/api", dbConnectionMiddleware, routes);
  }

  setBodyParserConfig() {
    // App.use(bodyParser.json());
    App.use(bodyParser.json({ limit: '50mb' }))
    App.use(bodyParser.urlencoded({
      limit: '50mb',
      extended: true
    }));

  }

  helmetSetup() {
    App.use(helmet());
  }

  errorHandler() {
    App.use((error: any, req: Request, res: Response, next: NextFunction) => {
      console.log("\x1b[36m", "Error : ", error);
      const statusCode = error.statusCode || 500;
      const messages = error.message;
      const data = error.data;
      res.status(statusCode).json({
        messages,
        data
      });
    });
  }

  setCorsConfig() {
    App.use(cors(global.config.cors))
    App.set("trust proxy", 1);
  }

  setMulterCongif() { }

  setStaticDirectories() {
    App.use("/api/public/images", express.static("public/images"));
  }

}

export default ApplicationServer

