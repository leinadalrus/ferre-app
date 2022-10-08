const cheerio = require('cheerio')
const { timeFormatDefaultLocale } = require('d3')
const dataForge = require('data-forge')

class MarkdownCrawlProcessor {
  crawlContent (documentFile) {
    let req = new Request()
    return req.get(documentFile).then(res => {
      const $ = cheerio.load(res)
      const df = new dataForge.DataFrame({
        columnNames: ['ID', 'Author', 'Title', 'Timestamp', 'Date'],
        rows: [
          [0, 'John Doe', 'Hello World!', timeFormatDefaultLocale(), new Date()]
        ]
      }).bake()
    })
  }

  header (location) {
    this.crawlContent(location)
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  validateContent () {
    const $ = cheerio.load(res)
    $.post(this.#mainApplication.staticFilesMiddleware)
    if (!this.#mainApplication.staticFilesMiddleware) {
      throw new Error('Invalid middleware throughput!')
    }
  }

  #mainApplication = new MainApplication()
}
