let video = document.querySelector("video");
let captureBtnCont = document.querySelector(".capture-btn-cont");
let captureBtn = document.querySelector(".capure-btn");
let transparentColor= "transparent";
let recordBtnCont = document.querySelector(".record-btn-cont");
let recordBtn = document.querySelector(".record-btn");
let chunks = [];
let shouldRecord =false;

let recorder;
let constraints={
    video: true,
    audio : false,
}

navigator.mediaDevices.getUserMedia(constraints)
   .then((stream) => {
         video.srcObject=stream;

         recorder = new MediaRecorder(stream);
         recorder.addEventListener("start",()=>{
            chunks = [];
         })

         recorder.addEventListener("dataavailable",(e)=>{
            chunks.push(e.data);
         })

         recorder.addEventListener("stop",(e)=>{
            //convert video
            //download video on desktop
            //store in database
         })
    });

// Click a Photo
captureBtnCont.addEventListener("click",()=>{
    let canvas = document.createElement("canvas");
    let tool = canvas.getContext("2d");
    canvas.height=video.videoHeight;
    canvas.width = video.videoWidth;

    tool.drawImage(video,0,0,canvas.width,canvas.height);

    //Applying filters on photo
    tool.fillStyle = transparentColor;
    tool.fillRect(0,0,canvas.width,canvas.height);

    let imageURL = canvas.toDataURL();
    // let img = document.createElement("img");
    // img.src=imageURL;
    // document.body.append(img);
})

//Record the video
recordBtnCont.addEventListener("click",()=>{

    shouldRecord!=shouldRecord;
    if(shouldRecord){
        recorder.start();
        startTimer();
    }
    else{
        recorder.stop();
        stopTimer();
    }
})


