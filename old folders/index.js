/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http:// www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ==============================================================================
 */

// This tiny example illustrates how little code is necessary build /
// train / predict from a model in TensorFlow.js.  Edit this code
// and refresh the index.html to quickly explore the API.

// Tiny TFJS train / predict example.
//const loaded_model = await tf.loadLayersModel('../saved_models/tfjs/model.json');

//loaded_model.predict((tf.tensor2d([20], [1, 1]))
console.log("print 1");

document.getElementById("clickMe").onclick = my_func;


async function my_func() {
    console.log("button clicked");
    const uploadJSONInput = document.getElementById('upload-json');
    const uploadWeightsInput = document.getElementById('upload-weights');
    const image = document.getElementById('upload-img');
    const loadedModel = await tf.loadLayersModel(tf.io.browserFiles([uploadJSONInput.files[0], uploadWeightsInput.files[0]]));
    const imageData = new ImageData(48, 48);

    console.log(image)
    console.log(typeof image)


    const im = new Image()
    im.src = "happy_bruno4.jpg";
    im.onload = () => {
        const a = tf.browser.fromPixels(im, 1)
        a.print()
        console.log(a.shape)
    }

    const tensorImg = tf.browser.fromPixels(imageData)
        .mean(2)
        .toFloat()
        .expandDims(0)
        .expandDims(-1)
    console.log(tensorImg);
    prediction = loadedModel.predict(tensorImg).dataSync()
    console.log('Prediction:')
    console.log(prediction)

    var canvasEdited = document.getElementById('canvasEdited');
    var ctxEdited = canvasEdited.getContext('2d');
    ctxEdited.drawImage(img, 0, 0, canvasEdited.width, canvasEdited.height);
    var imageData2 = ctxEdited.getImageData(0, 0, canvasEdited.width, canvasEdited.height);
    console.log(imageData2)
}

async function run() {
    console.log("print 2");
    sleep(10)
    console.log("print 3");
    const uploadJSONInput = document.getElementById('upload-json');
    const uploadWeightsInput = document.getElementById('upload-weights');
    const loaded_model = await tf.loadLayersModel(tf.io.browserFiles([uploadJSONInput.files[0], uploadWeightsInput.files[0]]));
    //const loaded_model = await tf.loadLayersModel('file:///../saved_models/tfjs/model.json');

    //document.getElementById('micro-out-div').innerText = loaded_model.predict((tf.tensor2d([20], [1, 1])))
    console.log("print 4");
    // Create a simple model.
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    // Prepare the model for training: Specify the loss and the optimizer.
    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

    // Generate some synthetic data for training. (y = 2x - 1)
    const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4], [6, 1]);
    const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7], [6, 1]);

    // Train the model using the data.
    await model.fit(xs, ys, { epochs: 250 });

    // Use the model to do inference on a data point the model hasn't seen.
    // Should print approximately 39.
    document.getElementById('micro-out-div').innerText =
        loaded_model.predict(tf.tensor2d([20], [1, 1])).dataSync();
}

//run();