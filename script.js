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
document.getElementById("clickMe").onclick = load_model;
// initialize model variable
var model = true

//Function to load model
async function load_model() {
    console.log("button clicked");
    model = await tf.loadLayersModel('saved_models/7813-bruno/model.json');
    console.log(model)
}

const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const webcam = new Webcam(webcamElement, 'user', canvasElement);

webcam.start()
    .then(result => {
        console.log("webcam started");
    })
    .catch(err => {
        console.log(err);
    });

document.getElementById("webcamButton").onclick = takeSnap;

function takeSnap() {
    let picture = webcam.snap();
    //console.log(picture)
    //console.log(typeof picture)
    convertURIToImageData(picture).then(function (imageData) {
        // Here you can use imageData
        console.log(imageData);
        var a = tf.browser.fromPixels(imageData, 1)
        a = a.div(255)
        console.log(a.shape)
        var resized = tf.image.resizeBilinear(a, [48, 48]);
        //console.log(a.data[0])
        var tensor = resized.expandDims(0);
        var prediction = model.predict(tensor);
        prediction.print()
    });
}

function convertURIToImageData(URI) {
    return new Promise(function (resolve, reject) {
        if (URI == null) return reject();
        var canvas = document.createElement('canvas'),
            context = canvas.getContext('2d'),
            image = new Image();
        image.addEventListener('load', function () {
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            resolve(context.getImageData(0, 0, canvas.width, canvas.height));
        }, false);
        image.src = URI;
    });
}
/* const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');
const demosSection = document.getElementById('demos');
const enableWebcamButton = document.getElementById('webcamButton');

// Check if webcam access is supported.
function getUserMediaSupported() {
    return !!(navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia);
}

// If webcam supported, add event listener to button for when user
// wants to activate it to call enableCam function which we will
// define in the next step.
if (getUserMediaSupported()) {
    enableWebcamButton.addEventListener('click', enableCam);
} else {
    console.warn('getUserMedia() is not supported by your browser');
}

// Placeholder function for next step.
function predictWebcam() {
    console.log('predict')
    console.log(video)
}

// Pretend model has loaded so we can try out the webcam code.
//var model = true;
demosSection.classList.remove('invisible');

// Placeholder function for next step. Paste over this in the next step.
function enableCam(event) {
    console.log(model)
    // Only continue if the COCO-SSD has finished loading.
    if (!model) {
        return;
    }

    // Hide the button once clicked.
    event.target.classList.add('removed');

    // getUsermedia parameters to force video but not audio.
    const constraints = {
        video: true
    };

    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        video.srcObject = stream;
        video.addEventListener('loadeddata', predictWebcam);
    });
} */


/* document.getElementById("clickMe").onclick = run;
async function run() {

    const model = await tf.loadLayersModel('saved_models/7813-bruno/model.json');

    const im = new Image()
    im.src = "test_pics/happy_bruno4.jpg";
    im.onload = () => {

        var a = tf.browser.fromPixels(im, 1)
        a = a.div(255)
        console.log(a.shape)
        var resized = tf.image.resizeBilinear(a, [48, 48]);
        //console.log(a.data[0])
        var tensor = resized.expandDims(0);
        var prediction = model.predict(tensor);
        prediction.print()
    }
} */