//DOM objects
var sequenceContainer = document.getElementById("sequenceContainer");
var spaceButton = document.getElementById("space");

//variables
var experimentActive = false;
var sequenceArray = [];
var currentChar = null;
var focusedLetter = 0;

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
    // 15 machen noch
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
        console.log("hi");
        if(focusedLetter<sequenceArray.length-1) {
            sequenceContainer.children[focusedLetter].style.color="green";
            focusedLetter++;
            focusLetter(focusedLetter);
        }
        else {
            sequenceContainer.children[focusedLetter].style.color="green";
            sequenceContainer.style.textDecoration="line-through";
        }   
    }
    else if(clickedKey!=currentChar && event.target.id!=null) {
        sequenceContainer.children[focusedLetter].style.color="red";
        setTimeout(function()  {
            focusLetter(focusedLetter)
        }, 100);
    }

}

function focusLetter(letterPosition) {
    sequenceContainer.children[letterPosition].style.color="white";
}

