const googleCloudLanguage = require('@google-cloud/language')
const cloudClient = new googleCloudLanguage.LanguageServiceClient()

const sentimentCNNV1Model =
  'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json'
const sentimentCNNV1Metadata =
  'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json'

const [onResult] = await cloudClient.analyzeSentiment({ sentimentCNNV1Model })

const sentimentResult = onResult.documentSentiment

console.log('Document sentiment:')
console.log(`\tScore: ${sentimentResult.score}`)
console.log(`\tMagnitude: ${sentimentResult.magnitude}`)

const sentencesResult = sentimentResult.sentences

sentencesResult.forEach(sentence => {
  console.log(`Sentence: ${sentence.text.content}`)
  console.log(`\tScore: ${sentence.sentiment.score}`)
  console.log(`\tMagnitude: ${sentence.sentiment.magnitude}`)
})
