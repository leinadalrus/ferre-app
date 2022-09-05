import '../styles/globals.css'
import '../styles/index.css'
import { useState } from 'react'
import MarkdownEditorController from '../app/controllers/MarkdownEditorController'
import MarkdownEditorModel from '../app/models/MarkdownEditorModel'
const marked = require('marked')

function MyApp ({ Component, pageProps }) {
  const [text, setText] = useState('')
  return (
    <html>
      <link rel='stylesheet' href='styles/index.css'></link>
      <script type='text/javascript' src='api/editor.js'></script>
    </html>
  )

  return <Component {...pageProps} />
}

export default MyApp
