import '../styles/globals.css'
import { useState } from 'react'
import MarkdownEditorController from '../app/controllers/MarkdownEditorController'
import MarkdownEditorModel from '../app/models/MarkdownEditorModel'
const marked = require('marked')

function MyApp ({ Component, pageProps }) {
  let markdownEditor = new MarkdownEditorModel()
  return <Component {...pageProps} />
}

export default MyApp
