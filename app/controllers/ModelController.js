import { useRouter } from "next/router";

class ModelController {
  constructor() {}

  getController() {
    const controller = this.nextRouter.query.controller;
    return controller;
  }

  getAction() {
    const action = this.nextRouter.query.action;
    return action;
  }

  getID() {
    const id  = this.nextRouter.query.id;
    return id;
  }

  #extRouter = useRouter();
};

export default ModelController;