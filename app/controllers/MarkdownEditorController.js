const marked = require('marked')
import ModelController from './ModelController'

class MarkdownEditorController extends ModelController {
  constructor () {
    super()
    const markdownEditorOps = {
      src: '/public/documents/baseModel.md',
      type: 'file/md'
    }
  }
}

export default MarkdownEditorController
