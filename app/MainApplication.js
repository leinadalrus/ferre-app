'use strict'

const express = require('express')
const pathstl = require('path')

import { Component } from 'react'
import { createRoot } from 'react-dom/client'

class MainApplication extends Component {
  #app = express()
  #staticFilesPath = pathstl.join(__dirname, 'public')
  #staticFilesMiddleware = express.static(staticFilesPath)

  init () {
    this.#app.use('/', staticFilesMiddleware)

    this.#app.get(
      this.#staticFilesPath + '/resources/rest/data',
      (req, res) => {
        res.json(console.error())
      }
    )

    this.#app.listen(3000, () => {
      console.log('Listening on port: 3000')
    })
  }

  async getStaticPaths () {
    var retval = {
      paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
      fallback: false // can also be true or 'blocking'
    }

    const paths = posts.map(post => ({
      params: { id: post.id }
    }))
    // When this is true (in preview environments) don't
    // prerender any static pages
    // (faster builds, but slower initial page load)
    if (process.env.SKIP_BUILD_STATIC_GENERATION) {
      retval = {
        paths: [],
        fallback: 'blocking'
      }
    } else {
      retval = { paths, fallback: false }
    }

    return retval
  }

  async getServerSideProps () {
    const res = await fetch(this.#staticFilesPath + `/resources/rest/data`)
    const data = await res.join(__dirname, 'public')

    return { props: { data } }
  }

  Post ({ post }) {}
}

export default MainApplication
MainApplication.init()
