//DOM objects
var sequenceContainer = document.getElementById("sequenceContainer");
var spaceButton = document.getElementById("space");

//variables
var experimentActive = false;
var sequenceArray = [];
var currentChar = null;

//constants
const characters  = "ABCDEFGHIJKLMNOPQRSTUVWXYZ,.";



document.addEventListener("click", function(event){
    var clickedKeyId = event.target.id;

    if (!experimentActive) {
        if(clickedKeyId=="space") {   
            startExperiment();
            return;
        }
    }

    // hier eventuell suchen beschränken auf wenn
    // key gedrückt wird, geht aber auch ohne
    if(experimentActive) {
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
}


function generateSequence() {
    for (i = 0; i < 15; i++) {
        var randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
        sequenceArray.push(randomCharacter);
        sequenceContainer.innerHTML = sequenceContainer.innerHTML.concat(sequenceArray[i]);
    }
}

function compareCharacter(event) {
    clickedKeyChar = event.target.innerHTML;
    currentChar=sequenceArray[0];
    var clickedKey = document.getElementById(event.target.id);

    if(clickedKeyChar==currentChar)  {
        console.log("hi");
        sequenceContainer.style.color="white";
    }
}
