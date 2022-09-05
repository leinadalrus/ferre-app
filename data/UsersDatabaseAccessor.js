import "./PostgresConnector";
import express, { Express } from "express";
import postgres from "postgres";
import PostgresConnector from "./PostgresConnector";
const ExpressSession = require("express-session");
const DexterMorgan = require("morgan");

class UsersDatabaseAccessor {
  constructor() {
    this.app.use(DexterMorgan("dev"));
    this.app.use(ExpressSession({
      resave: false,
      saveUninitialized: false,
      secret: "Inland_Imperial_1",
      store: PostgresConnector,
    }));
  }

  UsersDatabaseAccessor(reqsA, respA, next) {
    let user = this.users;
    respA.send(reqsA.user.name);

    this.app.get("/.*User(s)?$/", this.preload, this.restrict, (reqsB, respB) => {
      reqsB = reqsA;
      respB = respA;

      respB.send(reqsB);
      next();
    });
  }

  checkVerbose(isVerbose = process.env.NODE_ENV != "test") {
    this.app.map = (enumerables, route) => {
      route = route || "";
      for (let key in enumerables) {
        do {
          if (key == "object")
            this.app.map(enumerables[key], route + key);
          else if (key == "function") {
            if (isVerbose)
              console.log('%s %s', key, route);
            this.app.map[key](enumerables[key], key);
          }
        } while (key);
      }
    };
  }

  /* private enumerateSitemap() {
    this.app.map({
      '/users': {
        get: this.funcs.list,
        delete: this.funcs.delete,
        '/:uid': {
          get: this.funcs.get,
        }
      }
    });
  } */

  preload(reqs, resp, next) {
    let user = this.users;
    if (user) {
      reqs.user = user;
      next();
    } else {
      next(new Error(reqs.param.id));
    }

    resp.send(this.users);
  }

  restrict(reqs, resp, next) {
    let user = this.users;

    if (user) {
      reqs.user = user;
      next();
    } else {
      next(new Error(reqs.param.id));
    }
  }

  async getIndivUser() {
    const users = await this.sql`
      select
        id
      from users
      where id >= 0
    `
  }

  async getUserGroup() {
    const users = await this.sql`
      select
        *
      from users
    `
  }

  async setIndivUser() {
    const users = await this.sql`
      update users
      set id = 0, firstName = 'Danny', lastName = 'Boy'
    `
  }

  async setUserGroup() {
    const users = await this.sql`
      update users
      set id = 0
      where id = 0
    `
  }

  #sql = postgres('postgres://boyEmperor:Inland_Imperial_1@127.0.0.1:22/usersdatabase', {
    host                 : '127.0.0.1',            // Postgres ip address[s] or domain name[s]
    port                 : 5432,          // Postgres server port[s]
    database             : 'users',            // Name of database to connect to
    username             : 'boyEmeperor',            // Username of database user
    password             : 'Inland_Imperial_1',            // Password of database user
  });
  #app = express();
  #users = this.app.use(ExpressSession({
    resave: false,
    saveUninitialized: false,
    secret: "Inland_Imperial_1",
    store: PostgresConnector,
  }));
};