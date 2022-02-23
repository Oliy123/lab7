

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
var cartoData = L.layerGroup().addTo(map);

var url = "https://oliy123.carto.com/api/v2/sql";
var urlGeoJSON = url + "?format=GeoJSON&q=";
// change the Query below by replacing lab_7_name with your table name
var sqlQuery = "SELECT the_geom, name, phone, roadProblem, traffic_stop, trafic_slowed_down, could_cause_an_accident, datetime, comment FROM lab_7_oliyad";
function addPopup(feature, layer) {
  layer.bindPopup(
    "<b> Name: </b>" + feature.properties.name
    + "<b><br> Phone Number: </b> " + feature.properties.phone
    + "<b><br> Problem of the road: </b>" + feature.properties.roadproblem
    + "<b><br> trafic slowed down? </b> " + feature.properties.trafic_slowed_down
    + "<b><br> traffic stoped? </b>" + feature.properties.traffic_stop
    + "<b><br> Could Cause An Accident? </b>" + feature.properties.could_cause_an_accident
    + "<b><br> DateTime: </b>" +feature.properties.datetime
    + "<b><br> Comment </b>" + feature.properties.comment

    ).openPopup();
  }

fetch(urlGeoJSON + sqlQuery)
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {
        L.geoJSON(data, {onEachFeature: addPopup}).addTo(cartoData);
    });
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
            '<b>Please Type your Phone Number:</b><br><input type="text" id="phone"><br><br><b>what is the issue with this road?</b><br><input type="checkbox" id="pothole" name="RoadProblem"><label for="potholes">pothole</label><br><input type="checkbox" id="sidewalk" name="RoadProblem" ><label for="sidewalk">sidewalk</label><br><input type="checkbox" id="gravel_Road" name="RoadProblem"><label for="gravel_Road"> gravel Road</label><br><input type="checkbox" id="shoulder_maintenance" name="RoadProblem"><label for="shoulder_maintenances"> shoulder maintenance</label><br><input type="checkbox" id="vegetation" name="RoadProblem"><label for="vegetation"> vegetation</label><br><input type="checkbox" id="snow_Ice" name="RoadProblem"><label for="snow_Ice"> snow Ice</label><br><input type="checkbox" id="drainage_open" name="RoadProblem"><label for="drainage_open"> drainage open</label><br><input type="checkbox" id="bridge_maintenance" name="RoadProblem"><label for="bridge_maintenance"> bridge maintenance</label><br><input type="checkbox" id="dead_animal" name="RoadProblem"><label for="dead_animal"> dead animal</label><br><input type="checkbox" id="others" name="RoadProblem"><label for="others"> Others</label><input type="text" id="others" name="RoadProblem" rows="3" cols="20"></textarea><br><br>'
            +'<b>Has the vehicle been stopped due to a lack of maintenance?:</b><br><select id="traffic_stop" name="TrafficStop"> <option value="">--Please Select--</option><option value="Yes">Yes</option><option value="No">No</option><option value="Unknown">Unknown</option></select><br><br>'
            +'<b>Has the vehicle been slowed down due to a lack of maintenance?</b><br><select id="trafic_slowed_down" name="traficSlowed" ><option value="">--Please Select--</option><option value="Yes">Yes</option><option value="No">No</option><option value="Unknown">Unknown</option></select><br><br>'
            +'<b>Is this likely to cause an accident?</b><br><select id="Could_Cause_An_Accident" name="CouseAccident" ><option value="">--Please Select--</option><option value="Yes">Yes</option><option value="No">No</option><option value="Unknown">Unknown</option></select><br><br>'
            +'<b>Enter a date and time:</b><input id="datetime" type="datetime-local" name="datetime"><br><br>'                                                                                          //<b>Comment:</b><br><textarea id="comment" name="comment" rows="3" cols="20"></textarea><br><br>
            +'<b>Comment:</b><br><textarea id="comment" name="comment" rows="3" cols="20"></textarea><br><br>'
            +'<input type="button" value="Submit" id="submit">'
            +'<input type="reset" value="Reset">'
            +'</form>'
    drawnItems.bindPopup(popupContent,{maxHeight:500, minWidth:50}).openPopup();
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
        var enteredRoadProblem = '';
          if (pothole.checked == true)
              {var enteredRoadProblem = enteredRoadProblem +'pothole, '}
          else {var enteredRoadProblem = enteredRoadProblem };
          if (sidewalk.checked == true)
              {var enteredRoadProblem = enteredRoadProblem +'sidewalk, '}
          else {var enteredRoadProblem = enteredRoadProblem };
          if (gravel_Road.checked == true)
              {var enteredRoadProblem = enteredRoadProblem +'gravel_Road, '}
          else {var enteredRoadProblem = enteredRoadProblem };
          if (shoulder_maintenance.checked == true)
              {var enteredRoadProblem = enteredRoadProblem +'shoulder_maintenance, '}
          else {var enteredRoadProblem = enteredRoadProblem };
          if (vegetation.checked == true)
              {var enteredRoadProblem = enteredRoadProblem +'vegetation, '}
          else {var enteredRoadProblem = enteredRoadProblem };
          if (snow_Ice.checked == true)
              {var enteredRoadProblem = enteredRoadProblem +'snow_Ice, ' }
          else {var enteredRoadProblem = enteredRoadProblem };
          if (drainage_open.checked == true)
              {var enteredRoadProblem = enteredRoadProblem +'drainage_open, '}
          else {var enteredRoadProblem = enteredRoadProblem };
          if (bridge_maintenance.checked == true)
              {var enteredRoadProblem = enteredRoadProblem +'bridge_maintenance, '}
          else {var enteredRoadProblem = enteredRoadProblem };
          if (dead_animal.checked == true)
              {var enteredRoadProblem = enteredRoadProblem +'dead_animal, '}
          else {var enteredRoadProblem = enteredRoadProblem };
          if (others.checked == true)
              {var enteredRoadProblem = enteredRoadProblem + document.get.getElementById('others').value}
          else {var enteredRoadProblem = enteredRoadProblem };
        var enteredtraffic_stop = document.getElementById("traffic_stop").value;
        var enteredtrafic_slowed_down = document.getElementById("trafic_slowed_down").value;
        var enteredCould_Cause_An_Accident = document.getElementById("Could_Cause_An_Accident").value;
        var entereddatetime = document.getElementById("datetime").value;
        var enteredcomment = document.getElementById("comment").value;
        // Print input
        // For each drawn layer
  drawnItems.eachLayer(function(layer) {

    // Create SQL expression to insert layer
          var drawing = JSON.stringify(layer.toGeoJSON().geometry);
          var sql =
              "INSERT INTO lab_7_oliyad (the_geom, name, phone, roadproblem, could_cause_an_accident, trafic_slowed_down, traffic_stop, datetime, comment) " +
              "VALUES (ST_SetSRID(ST_GeomFromGeoJSON('" +
              drawing + "'), 4326), '" +
              enteredUsername + "', '" +
              enteredPhoneNumber + "', '" +
              enteredRoadProblem + "', '" +
              enteredtraffic_stop + "', '" +
              enteredtrafic_slowed_down + "', '" +
              enteredCould_Cause_An_Accident + "', '" +
              entereddatetime + "', '" +
              enteredcomment + "') ";
          console.log(sql);

          // Send the data
          fetch(url, {
              method: "POST",
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
              },
              body: "q=" + encodeURI(sql)
          })
          .then(function(response) {
              return response.json();
          })
          .then(function(data) {
              console.log("Data saved:", data);
          })
          .catch(function(error) {
              console.log("Problem saving the data:", error);
          });

      // Transfer submitted drawing to the CARTO layer
      //so it persists on the map without you having to refresh the page
      var newData = layer.toGeoJSON();
      newData.properties.name = enteredUsername;
      newData.properties.phone = enteredPhoneNumber;
      newData.properties.RoadIssue = enteredRoadProblem;
      newData.properties.traffic_stop = enteredtraffic_stop;
      newData.properties.Could_Cause_An_Accident = enteredtrafic_slowed_down;
      newData.properties.name = enteredCould_Cause_An_Accident;
      newData.properties.datetime = entereddatetime;
      newData.properties.comment = enteredcomment;
      L.geoJSON(newData, {onEachFeature: addPopup}).addTo(cartoData);

  });
        // Clear drawn items layer
        // drawnItems.closePopup();
        drawnItems.closePopup();
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
