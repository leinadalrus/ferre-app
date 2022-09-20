'use strict'

const fs = require('fs')
const dataForge = require('data-forge')

function readConclusions (fileName) {
  return new Promise((yes, no) => {
    fs.readFile(fileName, 'utf-8', function (err, data) {
      var retval

      if (err) {
        no(err)
        retval = null
        console.error((err && err.stack) || err)
      }

      yes(data)
      retval = JSON.parse(data)
      console.log(data)

      dataForge
        .readFile('/~/data/' + fileName)
        .parseJSON()
        .then(dataFrame => {
          console.log('||| H E A D |||')
          console.log(
            dataFrame
              .getSeries('Event')
              .head(5)
              .toString()
          )
          console.log('||| T A I L |||')
          console.log(
            dataFrame
              .getSeries('Log')
              .tail(5)
              .toString()
          )

          dataFrame = dataFrame.parseFloats([
            'Year',
            'Month',
            'Day',
            'Time',
            'Event',
            'Log'
          ])
          console.log(dataFrame.detectTypes().toString())
        })
        .catch(err => {
          console.error((err && err.stack) || err)
        })

      return retval
    })
  })
}

function writeConclusions (filename, data) {
  const json = JSON.stringify(data, null, 2)
  return fs.write(filename, json)
}

module.exports = {
  readConclusions: readConclusions,
  writeConclusions: writeConclusions
}
