img="";
status="";
var objects=[];
function preload() {
    img=loadImage('bedroom.jpg');
}

function setup() {
    canvas=createCanvas(640,420);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(640,420);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function modelLoaded() {
    console.log("Model is loaded :)");
    status=true;
    
    
}
function gotResult(error,results) {
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;

    }
} 

function draw() {
    image(video,0,0,640,420);

    if(status!=""){
        objectDetector.detect(video,gotResult);
        r=random(255);
        g=random(255);
        b=random(255);
        for(i=0;i<objects.length;i++) {
            document.getElementById("status").innerHTML="Status: Object Detected";
            document.getElementById("objects").innerHTML="Number of objects detected are: "+objects.length;
            fill(r,g,b);
            confidences=floor(objects[i].confidence*100);
            text(objects[i].label+" "+ confidences+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

        }
    }
   

}

