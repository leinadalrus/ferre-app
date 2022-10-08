import ModelController from './ModelController'

class RootIndexController extends ModelController {
  index () {
    this.compileTemplate('./pages/views/index.pug')
    this.renderTemplate('./pages/views/index.pug')
  }
}

module.exports = {
  index: RootIndexController.index
}

export default RootIndexController
