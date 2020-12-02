// ****************************************** TOGGLER ******************************************************************

function myFunction(x) {
  x.classList.toggle("change");
}

// ****************************************** ENTER KEY ***************************************************************

var input = document.getElementById("code");

  input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     document.getElementById("codebutton").click();
    }
  }
  )

//******************************************** LETS GO *********************************************************

document.querySelectorAll("button")[1].addEventListener("click",raasta);

function raasta(){
  var code1 = document.getElementById("code").value;
  var codee = code1.toUpperCase();
  if(codee.indexOf("-") == -1)
    alert("please enter the code, as shown in the example.");
  else
    switch(codee.slice(0,codee.indexOf("-"))){
      case 'B':
        if(codee[codee.indexOf("-") + 1] == 1)
        {
          alert("Right now, if you followed the instructions properly, you must be standing near SBI bank🏧. " + "\n" + "Click the 'OK' button to continue.");
          alert("Now, Enter the building." + "\n" + "Cross the placement cell and continue straight to reach at your destination..");
        }
        else if(codee[codee.indexOf("-") + 1] == 2)
        {
          alert("Right now, if you followed the instructions properly, you must be standing near SBI bank🏧 and can clearly see the spiral stairs going up the building. " + "\n" + "Click the 'OK' button to continue.");
          alert("Now, climb up spiral stairs to the first floor.");
          alert("now turn right and move straight untill you reach your destination.");
        }
        else if(codee[codee.indexOf("-") + 1] == 3)
        {
          alert("Right now, if you followed the instructions properly, you must be standing near SBI bank and can clearly see the spiral stairs going up the building. " + "\n" + "Click the 'OK' button to continue.");
          alert("Now, climb up spiral stairs to the second floor." + "\n" + "Yeah, I know its tough😥, but you can do it.");
          alert("now turn right and move straight untill you reach your destination.");
        }
        else
          alert("Sir/mam," + "\n" + "B-Block has only 3 floor. Kindly check your code and try again!");  
        break;

      case 'CS':
        if(codee.slice(codee.indexOf("-") + 1, 6) >= 104 && codee[codee.indexOf("-") + 1] == 1) {
          if(confirm("If you are standing at the canteen in front of the library, press 'OK'." + "\n" + "If not, then please go to Mode 1 and set your destination as CS Block"))
          {
            alert("Cross the canteen and the fountain. You will find a gate that will lead you to all the labs.");
            alert("Now turn right and move straight untill you reach your destination.");
          }
        }
        else if(codee.slice(codee.indexOf("-") + 1, 6) <= 104){
          if(confirm("If you are standing at the canteen in front of the library, press 'OK'." + "\n" + " If not, then please go to Mode 1 and set your destination as CS Block"))
          {
            alert("Cross the canteen and the fountain. You will find a gate that will lead you to all the labs.");
            alert("Now turn left and move straight untill you reach your destination.");
          }
        }
        else if(codee[codee.indexOf("-") + 1] == 2){
          if(confirm("If you are standing at the canteen in front of the library, press 'OK'." + "\n" + " If not, then please go to Mode 1 and set your destination as CS Block"))
          {
            alert("Cross the canteen and the fountain. You will find a gate that will lead you to the CS Block.");
            alert("As soon as you enter, on your slight right, you will see elevator and stairs!" + "\n" + "Go to the first floor by stairs or elevator.");
            alert("Getting out of elevator, you'll see labs on your right. Then turn left and get to your destination.")
          }
        }
        else if(codee[codee.indexOf("-") + 1] == 3){
          if(confirm("If you are standing at the canteen in front of the library, press 'OK'." + "\n" + " If not, then please go to Mode 1 and set your destination as CS Block"))
          {
            alert("Cross the canteen and the fountain. You will find a gate that will lead you to the CS Block.");
            alert("As soon as you enter, on your slight right, you will see elevator and stairs!" + "\n" + "Go to the second floor by stairs or elevator(recommended).");
            alert("Getting out of elevator, you'll see labs on your right. Then turn left and get to your destination.")
          }
        }
        else 
        alert("Sorry, Since this project is currently in its development stage, our database does not have the route to all the classrooms.");
        break;
      default:
        alert("Sorry, Since this project is currently in its development stage, our database does not have the route to all the classrooms.");
      }
}

//*********************************************** MAP ************************************************************** 
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 30.3564, lng: 76.3647 },
    zoom: 15,
  });
  new AutocompleteDirectionsHandler(map);
}
//  **********************************************AUTOCOMPLETE *****************************************************
class AutocompleteDirectionsHandler {
  constructor(map) {
    this.map = map;
    this.originPlaceId = "";
    this.destinationPlaceId = "";
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(map);
    const originInput = document.getElementById("origin-input");
    const destinationInput = document.getElementById("destination-input");
    const originAutocomplete = new google.maps.places.Autocomplete(originInput);
    // Specify just the place data fields that you need.
    originAutocomplete.setFields(["place_id"]);
    const destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput);
    destinationAutocomplete.setFields(["place_id"]);
    this.setupPlaceChangedListener(originAutocomplete, "ORIG");
    this.setupPlaceChangedListener(destinationAutocomplete, "DEST");
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
    setupPlaceChangedListener(autocomplete, mode)
    {
      autocomplete.bindTo("bounds", this.map);
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
  
        if (!place.place_id) {
          window.alert("Please select an option from the dropdown list.");
          return;
        }
  
        if (mode === "ORIG") {
          this.originPlaceId = place.place_id;
        } else {
          this.destinationPlaceId = place.place_id;
        }
        this.route();
      });
    }

    // **************************************************** ROUTE ************************************************
    route() 
    {
      if (!this.originPlaceId || !this.destinationPlaceId) {
        return;
      }
      const me = this;
      this.directionsService.route(
        {
          origin: { placeId: this.originPlaceId },
          destination: { placeId: this.destinationPlaceId },
          travelMode: this.travelMode,
        },
        (response, status) => {
          if (status === "OK") {
            me.directionsRenderer.setDirections(response);
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
    }
  }
  }