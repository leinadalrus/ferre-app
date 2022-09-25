import * as tensorflowjs from '@tensorflow/tfjs'
import { OOV_INDEX, padSequences } from './sequence_utils'
import { readFile } from 'fs'

const PAD_INDEX = 0
const OOV_INDEX = 2

function padSequences (
  sequences,
  maxLen,
  padding = 'pre',
  truncating = 'pre',
  value = PAD_INDEX
) {
  return sequences.map(seq => {
    if (seq.length > maxLen) {
      if (truncating === 'pre') {
        seq.splice(0, seq.length - maxLen)
      } else {
        seq.splice(maxLen, seq.length - maxLen)
      }
    }

    // Perform padding.
    if (seq.length < maxLen) {
      const pad = []
      for (let i = 0; i < maxLen - seq.length; ++i) {
        pad.push(value)
      }
      if (padding === 'pre') {
        seq = pad.concat(seq)
      } else {
        seq = seq.concat(pad)
      }
    }

    return seq
  })
}

class LocalHosting {
  hostedURLs = {
    model:
      'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json',
    metadata:
      'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json'
  }
}

class ModelLoader {
  async isCurrentlyProcessing (filename) {
    try {
      const response = await fetch(filename, { method: 'HEAD' })
      return response.ok
    } catch (err) {
      return false
    }
  }

  async loadModel (filename) {
    try {
      return tensorflowjs.loadLayersModel(filename)
    } catch (err) {
      console.error(err)
    }
  }

  async loadMetadata (filename) {
    try {
      return await fetch(filename)
    } catch (err) {
      console.error(err)
    }
  }
}

class SentimentProcessor {
  #urls = new LocalHosting()
  #modelLoader = new ModelLoader()

  async loadMetadata () {
    const sentimentMetadata = await this.#modelLoader.loadModel(
      this.#urls.hostedURLs.model
    )
    this.indexFrom = sentimentMetadata['index_from']
    this.maxLen = sentimentMetadata['max_len']
    this.wordIndex = sentimentMetadata['word_index']
    this.vocabularySize = sentimentMetadata['vocabulary_size']
    return this
  }

  async initProcess (urls) {
    this.#urls = urls
    this.#model = await this.#modelLoader.loadModel(this.#urls.hostedURLs.model)
    this.#modelLoader.loadMetadata(this.#urls.hostedURLs.metadata)
    await this.loadMetadata()
    return this
  }

  predictSentiment (filename) {
    var contents = readFile(filename)

    const characters = contents.trim().split(' ')
    // Convert the words to a sequence of word indices.
    const sequence = characters.map(word => {
      let wordIndex = this.wordIndex[word] + this.indexFrom
      if (wordIndex > this.vocabularySize) {
        wordIndex = OOV_INDEX
      }
      return wordIndex
    })

    const paddedSequence = padSequences([sequence], this.maxLen)
    const input = tensorflowjs.tensor2d(paddedSequence, [1, this.maxLen])

    const beginMs = performance.now()
    const predictOut = this.model.predict(input)
    const score = predictOut.dataSync()[0]
    predictOut.dispose()
    const endMs = performance.now()

    return { score: score, elapsed: endMs - beginMs }
  }
}

SentimentProcessor.loadModel(LocalHosting.hostedURLs.model)
SentimentProcessor.loadMetadata()
SentimentProcessor.initProcess()
SentimentProcessor.predictSentiment('./public/resources/documents/hemingway.md')
