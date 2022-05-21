//DOM objects
var sequenceContainer = document.getElementById("sequenceContainer");
var spaceButton = document.getElementById("space");
var trialCountContainer = document.getElementById("trial");

//variables
var experimentActive = false;
var sequenceArray = [];
var currentChar = null;
var focusedLetter = 0;
var allMovementTimes = [];
var allIndicesOfPerformance = [];
var startTime = 0;
var endTime = 0;
var trialCount = 0;
var trialActive = false;

var currentKeyPos = [];
var previousKeyPos = [];
var data = "";


//constants
const characters  = "ABCDEFGHIJKLMNOPQRSTUVWXYZ,.";




document.addEventListener("click", function(event){
    var clickedKeyId = event.target.id;
    isKey = (event.target.id.length==1 ||event.target.id=="comma"||event.target.id=="point");

    if (!experimentActive) {
        if(clickedKeyId=="space") {   
            startExperiment();

            assignFirstKey();


            return;
        }
    }

  
    if(experimentActive && isKey && trialActive) {
        compareCharacter(event);
    }


});
 

function assignFirstKey() {
    currentKeyBoundingClient = spaceButton.getBoundingClientRect();
    currentKeyPosX = currentKeyBoundingClient.left + currentKeyBoundingClient.width;
    currentKeyPosY = currentKeyBoundingClient.top + currentKeyBoundingClient.height;
    currentKeyPos[0] = currentKeyPosX;
    currentKeyPos[1] = currentKeyPosY;
}

function startExperiment() {
    experimentActive = true;
    sequenceContainer.innerHTML="";
    trialCountContainer.innerHTML= "Trial " + trialCount + "|20";
    sequenceContainer.style.letterSpacing="8px";
    startTrial();

}


function startTrial() {
    trialActive = true;
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
            console.log("fin");
            finishTrial();
            refreshData();
            if (trialCount < 1) {
                setTimeout(function() {
                    startNewTrial()
                }, 3000);
            }
            else {
                finishExperiment();
            }
         
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
    trialActive = false;
    sequenceContainer.children[focusedLetter].style.color = "green";
    sequenceContainer.style.textDecoration = "line-through";
    trialCount++;

}

function focusLetter(letterPosition) {
    sequenceContainer.children[letterPosition].style.color="white";
}


function refreshData() {
   /** for(var i=0; i<sequenceArray.length; i++) {
        console.log(sequenceContainer.children[i]);
        sequenceContainer.removeChild[i];
    } */
    sequenceContainer.innerHTML = "";
    sequenceContainer.style.textDecoration="none";
    trialCountContainer.innerHTML= "Trial " + trialCount + "|20";
    sequenceArray = [];
    currentChar = null;
    focusedLetter = 0;
    startTime = 0;
    endTime = 0;
    currentKeyPos = [];
    previousKeyPos = [];
    console.log("clear");
}


function startNewTrial() {
    assignFirstKey();
    startTrial();
}

function finishExperiment() {
    trialCount=0;
    console.log();
    experimentActive = false;
    sequenceContainer.style.letterSpacing="0";
    sequenceContainer.innerHTML="Thank you for participating!<br>Press Space to repeat the experiment<br>";
    exportData();
    
}


function exportData() {
    data+="Movement Times: \n"
    for(let i = 0; i<allMovementTimes.length; i++ ) {
        data+= allMovementTimes[i] + " ";
    }
    data+="\n\n";
    data+="Indices of Performance: \n"
    for(let i = 0; i<allIndicesOfPerformance.length; i++ ) {
        data+= allIndicesOfPerformance[i] + " ";
    }
    createExportFile(data);
    }

 
function createExportFile(data) {
    var element = document.createElement('a');
    var file = new Blob([data], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = name + 'keyboard_alphabetical.txt';
    element.click();
}