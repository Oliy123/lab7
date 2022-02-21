

var map = L.map('map').setView([47.2529, -122.4443], 12);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoib2xpeWFkIiwiYSI6ImNrdjdsbnYybjhhbzcydnQ5dGRjdWM3ODIifQ.x-icjc5_gVuDi8MWOqzw3g'
}).addTo(map);
L.easyButton('fas fa-info', function () {
  alert("The web map function allows users to report issues related to road maintenance or repairs. To report, On the left side of the web map, click on the point to pinpoint theexact location of issue's. ")

}).addTo(map)
// make the layer editable laye
var drawnItems = L.featureGroup().addTo(map);
// Initializing the drawing control
new L.Control.Draw({
    draw : {
        polygon : false,       // polygon disabled
        polyline : false,      // polyline disabled
        rectangle : false,     // Rectangles disabled
        circle : false,        // Circles disabled
        circlemarker : false,  // Circle markers disabled
        marker: true
    },
    edit : {
        featureGroup: drawnItems
    }
}).addTo(map);

// submission form  binds and opens a popup with an editable form on the drawnItems feature group:
   function createFormPopup() {
    var popupContent =
    '<form>'+
            '<b>Please Type your Name:</b><br><input type="text" id="name" autofocus><br><br>'+
            '<b>Please Type your Phone:</b><br><input type="text" id="phone"><br><br><b>what is the issue with this road?</b><br><input type="checkbox" id="pothole" name="RoadProblem"><label for="potholes">pothole</label><br><input type="checkbox" id="sidewalk" name="RoadProblem" ><label for="sidewalk">sidewalk</label><br><input type="checkbox" id="gravel_Road" name="RoadProblem"><label for="gravel_Road"> gravel Road</label><br><input type="checkbox" id="shoulder_maintenance" name="RoadProblem"><label for="shoulder_maintenances"> shoulder maintenance</label><br><input type="checkbox" id="vegetation" name="RoadProblem"><label for="vegetation"> vegetation</label><br><input type="checkbox" id="snow_Ice" name="RoadProblem"><label for="snow_Ice"> snow Ice</label><br><input type="checkbox" id="drainage_open" name="RoadProblem"><label for="drainage_open"> drainage open</label><br><input type="checkbox" id="bridge_maintenance" name="RoadProblem"><label for="bridge_maintenance"> bridge maintenance</label><br><input type="checkbox" id="dead_animal" name="RoadProblem"><label for="dead_animal"> dead animal</label><br><input type="checkbox" id="others" name="RoadProblem"><label for="others"> Others</label><input type="text" id="others"><br><br>'
            +'<b>Has the vehicle been stopped due to a lack of maintenance?:</b><br><select id="traffic_stop" name="TrafficStop"> <option value="">--Please Select--</option><option value="Yes">Yes</option><option value="No">No</option><option value="Unknown">Unknown</option></select><br><br>'

             +'<b>Has the vehicle been slowed down due to a lack of maintenance?</b><br><select id="trafic_slowed_down" name="traficSlowed" ><option value="">--Please Select--</option><option value="Yes">Yes</option><option value="No">No</option><option value="Unknown">Unknown</option></select><br><br>'
            +'<b>Is this likely to cause an accident?</b><br><select id="Could_Cause_An_Accident" name="CouseAccident" ><option value="">--Please Select--</option><option value="Yes">Yes</option><option value="No">No</option><option value="Unknown">Unknown</option></select><br><br>'
            +'<b>Can you attach a picture?</b><br><input type="file" id="input_image" name="image" accept="image/png, image/jpeg"><br><br>'
            +'<b>Enter a date and time:</b>+<input id="datetime" type="datetime-local" name="datetime"><br><br>'


            +'<b>Comment:</b><br><textarea id="comment" name="comment" rows="3" cols="20"></textarea><br><br>'
            +'<input type="button" value="Submit" id="submit">'
            +'<input type="reset" value="Reset">'
            +'</form>'
    drawnItems.bindPopup(popupContent).openPopup();
}

//change the event listener code to this
// event listener for adding drawn shapes to drawnItems
map.addEventListener("draw:created", function(e) {
    e.layer.addTo(drawnItems);
    createFormPopup();
});



// To print the GeoJSON of the drawn shapes
map.addEventListener("draw:created", function(e) {
  e.layer.addTo(drawnItems);
  drawnItems.eachLayer(function(layer) {
      var geojson = JSON.stringify(layer.toGeoJSON().geometry);
      console.log(geojson);
  });
});
// The event listener for clicking the “submit” button triggers the setData function.
function setData(e) {
    if(e.target && e.target.id == "submit") {
        // Get user name and description
        var enteredUsername = document.getElementById("name").value;
        var enteredPhoneNumber = document.getElementById("phone").value;
        var enteredRoadIssue = '';
          if (pothole.checked == true)
              {var enteredRoadIssue = enteredRoadIssue +'pothole, '}
          else {var enteredRoadIssue = enteredRoadIssue };
          if (sidewalk.checked == true)
              {var enteredRoadIssue = enteredRoadIssue +'sidewalk, '}
          else {var enteredRoadIssue = enteredRoadIssue };
          if (gravel_Road.checked == true)
              {var enteredRoadIssue = enteredRoadIssue +'gravel_Road, '}
          else {var enteredRoadIssue = enteredRoadIssue };
          if (shoulder_maintenance.checked == true)
              {var enteredRoadIssue = enteredRoadIssue +'shoulder_maintenance, '}
          else {var enteredRoadIssue = enteredRoadIssue };
          if (vegetation.checked == true)
              {var enteredRoadIssue = enteredRoadIssue +'vegetation, '}
          else {var enteredRoadIssue = enteredRoadIssue };
          if (snow_Ice.checked == true)
              {var enteredRoadIssue = enteredRoadIssue +'snow_Ice, ' }
          else {var enteredRoadIssue = enteredRoadIssue };
          if (drainage_open.checked == true)
              {var enteredRoadIssue = enteredRoadIssue +'drainage_open, '}
          else {var enteredRoadIssue = enteredRoadIssue };
          if (bridge_maintenance.checked == true)
              {var enteredRoadIssue = enteredRoadIssue +'bridge_maintenance, '}
          else {var enteredRoadIssue = enteredRoadIssue };
          if (dead_animal.checked == true)
              {var enteredRoadIssue = enteredRoadIssue +'dead_animal, '}
          else {var enteredRoadIssue = enteredRoadIssue };
          if (others.checked == true)
              {var enteredRoadIssue = enteredRoadIssue + document.get.getElementById('others').value}
          else {var enteredRoadIssue = enteredRoadIssue };
        var enteredTrafficStop = document.getElementById("traffic_stop").value;
        var enteredtrafic_slowed_down = document.getElementById("trafic_slowed_down").value;
        var enteredCould_Cause_An_Accident = document.getElementById("Could_Cause_An_Accident").value;
        var entereddatetime = document.getElementById("datetime").value;
        var enteredcomment = document.getElementById("comment").value;
        // var enteredimage = document.getElementById("input_image").value;
        // Print input
        console.log(enteredUsername);
        console.log(enteredPhoneNumber);
        console.log(enteredRoadIssue);
        console.log(enteredTrafficStop);
        console.log(enteredtrafic_slowed_down);
        console.log(enteredCould_Cause_An_Accident);
        console.log(entereddatetime);
        console.log(enteredcomment);
        // console.log(enteredimage);

        // Get and print GeoJSON for each drawn layer
        drawnItems.eachLayer(function(layer) {
            var drawing = JSON.stringify(layer.toGeoJSON().geometry);     //Converting the current layer to GeoJSON with the .toGeoJSON method
            console.log(drawing);                                         //Selecting just the "geometry" property of the GeoJSON, using .geometry
                                                                          //Applying the JSON.stringify function to convert the GeoJSON geometry object to a string
                                                                          //Printing the string with console.log

        });
        // Clear drawn items layer
        drawnItems.closePopup();
        // drawnItems.closePopup,{maxhight:50%}();
        drawnItems.clearLayers();
    }
}

document.addEventListener("click", setData);

map.addEventListener("draw:editstart", function(e) {
    drawnItems.closePopup();
});
map.addEventListener("draw:deletestart", function(e) {
    drawnItems.closePopup();
});
map.addEventListener("draw:editstop", function(e) {
    drawnItems.openPopup();
});
map.addEventListener("draw:deletestop", function(e) {
    if(drawnItems.getLayers().length > 0) {
        drawnItems.openPopup();
    }
});
