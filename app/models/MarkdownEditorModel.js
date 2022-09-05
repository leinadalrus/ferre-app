const marked = require('marked')
import { Component } from 'react'
import { createRoot } from 'react-dom/client'

class MarkdownEditorModel extends Component {
  constructor (pageProps) {
    super(pageProps)
  }

  onLoad () {
    const canvasQuery = this.#appRoot.querySelector('canvas')
    do {
      canvasQuery.width = window.innerWidth
      canvasQuery.height = window.innerHeight
    } while (window.onload)
  }

  onResize () {
    const canvasQuery = this.#appRoot.querySelector('canvas')

    do {
      if (canvasQuery) {
        canvasQuery.width = window.innerWidth
        canvasQuery.height = window.innerHeight
      }
    } while (window.onresize)
  }

  retrieveContent (userInput) {
    userInput = document.getElementById('user-input-form').value
    document.getElementById('markdown-editor-content').innerHTML = marked.parse(
      userInput
    )
  }

  #appRoot = createRoot(document.getElementById('root'))
}

export default MarkdownEditorModel
