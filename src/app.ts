import express from "express";
import cors from "cors";
const usersRoutes = require("./routes/user.routes");
const sessionsRoutes = require("./routes/session.routes");
const permissionsRoutes = require("./routes/permission.routes");
const perfilsRoutes = require("./routes/perfil.routes");

class App {
  private express: express.Application;
  constructor() {
    this.express = express();
    this.middlewares();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(usersRoutes);
    this.express.use(sessionsRoutes);
    this.express.use(permissionsRoutes);
    this.express.use(perfilsRoutes);
  }

  public getApp() {
    return this.express;
  }
}

export default new App().getApp();
