import express, { Express } from "express";
const ExpressSession = require("express-session");
const DexterMorgan = require("morgan");
const StructQuery = require("sql.js");

export default class PostgresConnector {
  constructor(request, response, next) {
    this.access(request, response, next);
  }

  async access(reqsA, respA, next) {
    this.app.get("/.*Data(s)?$/", (reqsB, respB) => {
      reqsB = reqsA;
      respB = respA;

      respB.send(reqsB);
      next();
    });

    const databasePromise = StructQuery({
      locateFile: next()
    });

    StructQuery().then((SQL) => {
      const databse = new SQL.Database(databasePromise)
    });

    const dataPromise = fetch("./data/models/usersDatabase.sqlite").then(res => res.arrayBuffer());
    const [SQL, buffer] = await Promise.all([databasePromise, dataPromise]);
    SQL.Database(new Uint8Array(buffer));
  }

  #app = express();
};