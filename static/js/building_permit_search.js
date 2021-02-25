
$(function() {
  var start_issue_date=""
  var end_issue_date=""
    $('input[name="daterange"]').daterangepicker({
      opens: 'left'
    }, function(start, end, label) {
      start_issue_date=start.format('MM/DD/YYYY');
      end_issue_date=end.format('MM/DD/YYYY');
      console.log("A new date selection was made: " + start_issue_date + ' to ' + end_issue_date);
 
    });
    // $('input[name="daterange"]').value=start_issue_date+" - "+end_issue_date;
  });

function submitFunction(){
 var json_dat="{{geocode}}"
 console.log(json_dat)
}
// console.log("out of function: " + start_issue_date + ' to ' + end_issue_date);
var mymap = L.map('mapid',{zoomControl: true}).setView([51.049999, -114.066666], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYWhtZWRzeWQiLCJhIjoiY2tsaWtvemlqMGE0czJ4cGxlaHMwZGUzNyJ9.ZqoUVoiuHS9LzOvahBnWKw'
}).addTo(mymap);
//add zoom control with your options
mymap.zoomControl.setPosition('bottomright');
//the first method to add geojson object
var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [51.05, -114.0]
    }
};

L.geoJSON(geojsonFeature).addTo(mymap);
// document.getElementById("submit").addEventListener("click", function() {
//   // var json_date={{geocode}};
//   console.log("json data"+json_date);
//   alert("hello world");
// });
