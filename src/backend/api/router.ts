import express from "express";

import {getTest} from "./test";
import { get } from "http";
export class ApiRouter {
  private router: express.Router;

  constructor() {
    this.router = express.Router();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get('/api/test', getTest);
  }

  public getRouter() {
    return this.router;
  }
}