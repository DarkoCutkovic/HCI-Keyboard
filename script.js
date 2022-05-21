//DOM objects
var sequenceContainer = document.getElementById("sequenceContainer");
var spaceButton = document.getElementById("space");

//variables
var experimentActive = false;
var sequenceArray = [];
var currentChar = null;
var focusedLetter = 0;
var allMovementTimes = [];
var allIndicesOfPerformance = [];
var startTime = 0;
var endTime = 0;

var currentKeyPos = [];
var previousKeyPos = [];



//constants
const characters  = "ABCDEFGHIJKLMNOPQRSTUVWXYZ,.";




document.addEventListener("click", function(event){
    var clickedKeyId = event.target.id;
    isKey = (event.target.id.length==1 ||event.target.id=="comma"||event.target.id=="point");

    if (!experimentActive) {
        if(clickedKeyId=="space") {   
            startExperiment();

            currentKeyBoundingClient=document.getElementById(clickedKeyId).getBoundingClientRect();
            currentKeyPosX = currentKeyBoundingClient.left + currentKeyBoundingClient.width;
            currentKeyPosY = currentKeyBoundingClient.top + currentKeyBoundingClient.height;
            currentKeyPos[0] = currentKeyPosX;
            currentKeyPos[1] = currentKeyPosY;


            return;
        }
    }

  
    if(experimentActive && isKey) {
       compareCharacter(event);
    }


});
 

function startExperiment() {
    experimentActive = true;
    sequenceContainer.innerHTML="";
    sequenceContainer.style.letterSpacing="8px";
    startTrial();

}


function startTrial() {
    generateSequence();
    startTime = Date.now();

    
}


function generateSequence() {
    // 5 bloß zum Testen eingestellt, Default wird 15 sein
    for (i = 0; i < 5; i++) {
        var randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
        sequenceArray.push(randomCharacter);
        let childChar = document.createElement("div");
        childChar.innerHTML=randomCharacter;
        sequenceContainer.appendChild(childChar);
    }
    focusLetter(0);
}


function compareCharacter(event) {
    clickedKeyChar = event.target.innerHTML;
    currentChar=sequenceArray[focusedLetter];
    var clickedKey = document.getElementById(event.target.id);
 

    if(clickedKeyChar==currentChar)  {

        endTime = Date.now();
        movementTime = endTime - startTime;
        allMovementTimes.push(movementTime);

        startTime=0;
        endTime=0;

        previousKeyPos[0] = currentKeyPos[0];
        previousKeyPos[1] = currentKeyPos[1];
        
        boundingClient=clickedKey.getBoundingClientRect();
        currentKeyPosX = boundingClient.left + boundingClient.width;
        currentKeyPosY = boundingClient.top + boundingClient.height;
        currentKeyPos[0] = currentKeyPosX;
        currentKeyPos[1] = currentKeyPosY;

        var distanceBetweenKeys = Math.hypot(currentKeyPos[0] - previousKeyPos[0], currentKeyPos[1] - previousKeyPos[1]);
        var indexOfPerformance = Math.log2(1 + distanceBetweenKeys/boundingClient.width);
        allIndicesOfPerformance.push(indexOfPerformance);


        if(focusedLetter<sequenceArray.length-1) {
            sequenceContainer.children[focusedLetter].style.color="green";
            focusedLetter++;
            focusLetter(focusedLetter);

            startTime = Date.now();

        }
        else {
            finishTrial();
            console.log(allMovementTimes);
            console.log(allIndicesOfPerformance);
        }   
    }
    else if(clickedKey!=currentChar) {       
        sequenceContainer.children[focusedLetter].style.color="red";
        setTimeout(function()  {
            focusLetter(focusedLetter)
        }, 100);
    }

}

function finishTrial() {
    sequenceContainer.children[focusedLetter].style.color = "green";
    sequenceContainer.style.textDecoration = "line-through";

 



}

function focusLetter(letterPosition) {
    sequenceContainer.children[letterPosition].style.color="white";
}

