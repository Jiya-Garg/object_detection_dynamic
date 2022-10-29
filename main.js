object_status = "";
objects = [];
function preload() {
}
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = 'Status - Detecting Objects';
}
function modelLoaded() {
    console.log('Model is loaded!');
    object_status = true;
}
function gotResult(error, result) {
    if (error) {
        console.error(error);
    }
    console.log(result);
    objects = result
}
function draw() {
    image(video, 0, 0, 380, 380)
    if (object_status != "") {
        objectDetector.detect(video, gotResult);
        document.getElementById("status").innerHTML = "Status - Objects Detected";
        document.getElementById("number_of_objects").innerHTML = "Number of Objects - " + objects.length;
        r = random(255);
        g = random(255);
        b = random(255);
        for (i = 0; i < objects.length; i++) {
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 20);
            textSize(20)
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}