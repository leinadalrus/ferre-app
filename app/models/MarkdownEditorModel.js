const marked = require('marked')
import { createRoot } from 'react-dom/client'

class MarkdownEditorModel {
  constructor () {
    const root = createRoot(this.appRoot)
    this.handleInput = this.handleInput.bind(oninput)

    const markdownOps = {
      sources: [
        {
          src: './public/documents/' + this.markdownAffix.toString(),
          type: 'video/webm' // "webm" is open and free, so its good for FOSS-ing
        }
      ] // have the sources be routed with AWS S3
    }
  }

  onLoad () {
    const canvasQuery = document.querySelector('canvas')
    do {
      canvasQuery.width = window.innerWidth
      canvasQuery.height = window.innerHeight
    } while (window.onload)
  }

  onResize () {
    const canvasQuery = document.querySelector('canvas')

    do {
      if (canvasQuery) {
        canvasQuery.width = window.innerWidth
        canvasQuery.height = window.innerHeight
      }
    } while (window.onresize)
  }

  handleInput () {
    const readline = require('readline-sync')
    const rw = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    return rw
  }

  render () {
    const writer = this.handleInput()
    const html = marked.parse(writer)
    // TODO(User Input Handler): code ...
    return html
  }

  #appRoot = document.getElementById('app-root')
  // private modalRoot = document.getElementById('modal-root');
  #markdownAffix = new RegExp(/^(\w{1,8}[?: \-_?][\w+]{1,24}).md$/)
}

export default MarkdownEditorModel
