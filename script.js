//DOM objects
var sequenceContainer = document.getElementById("sequenceContainer");
var spaceButton = document.getElementById("space");

//variables
var experimentActive = false;



document.addEventListener("click", function(event){
    var clickedKey = event.target.id;
    if(clickedKey=="space") {
        if (!experimentActive) {
            startExperiment();
            return;
        }
    }
});
 

function startExperiment() {
    experimentActive = true;
    sequenceContainer.innerHTML="123123123123123";
    sequenceContainer.style.letterSpacing="8px";
    

}


