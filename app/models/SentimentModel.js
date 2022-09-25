/* Bibliography:
Bileschi, S., Cai, S. and Nielsen, E., 2020. Deep Learning with JavaScript. 
  Manning Publications. 
*/
import * as tensorflowjs from '@tensorflow/tfjs'

const TrainTensors = {
  sizeMB: tensorflowjs.tensor2d(trainData.sizeMB, [20, 1]),
  // NOTE(timeSec): timeSec = kernel * sizeMB + bias
  timeSec: tensorflowjs.tensor2d(trainData.timeSec, [20, 1])
}

const TestTensors = {
  sizeMB: tensorflowjs.tensor2d(testData.sizeMB, [20, 1]),
  timeSec: tensorflowjs.tensor2d(testData.timeSec, [20, 1])
}

const SequentialModel = tensorflowjs.sequential()

SequentialModel.add(tensorflowjs.layers.dense({ inputShape: [1], units: 1 }))
// NOTE('meanAbsoluteError'): meanAbsoluteError =
//   average( absolute(modelOutput - targets) )
SequentialModel.compile({ optimizer: 'sgd', loss: 'meanAbsoluteError' })(
  /* NOTE('sgd'):
The sgd stands for 'stochastic gradient descent',
it means that we will use calculus to determine what adjustments we should make to the weights in order to reduce the loss; 
then we will make those adjustments and repeat the process.
*/
  async function () {
    await SequentialModel.fit(TrainTensors.sizeMB, TrainTensors.timeSec, {
      epochs: 10
    })
  }
)()

SequentialModel.evaluate(TestTensors.sizeMB, TestTensors.timeSec).print()
tensorflowjs.mean(trainData.timeSec).print()
tensorflowjs
  .mean(tensorflowjs.abs(tensorflowjs.sub(testData.timeSec, 0.295)))
  .print()

SequentialModel.fit(TrainTensors.sizeMB, TrainTensors.timeSec, { epochs: 200 })
SequentialModel.evaluate(TestTensors.sizeMB, TestTensors.timeSec).print()

let minFileMB = 1
let avgFileMB = 100
let maxFileMB = 10000
SequentialModel.predict(
  tensorflowjs.tensor2d([[minFileMB], [avgFileMB], maxFileMB])
).print()