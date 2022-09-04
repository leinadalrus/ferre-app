import { useRouter } from 'next/router'

export function ModelRouter() {
  return useRouter()
}

export default class ModelController {
  constructor () {
    this.nextRouter = ModelRouter()
  }

  getController () {
    const controller = this.nextRouter.query.controller
    return controller
  }

  getAction () {
    const action = this.nextRouter.query.action
    return action
  }

  getID () {
    const id = this.nextRouter.query.id
    return id
  }

  #nextRouter = ModelRouter()
}
