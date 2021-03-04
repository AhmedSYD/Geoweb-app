
//defime global variables
var grayLayer=L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
  'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/light-v9',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoiYWhtZWRzeWQiLCJhIjoiY2tsaWtvemlqMGE0czJ4cGxlaHMwZGUzNyJ9.ZqoUVoiuHS9LzOvahBnWKw'
});

// L.mapbox.accessToken="pk.eyJ1IjoiYWhtZWRzeWQiLCJhIjoiY2tsaWttNXd3MGR6djJwbm0yNjh3dTVtdiJ9.LxSvLSwUs6MZdZxym8V9wA";
var mylayer=L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'basic',
maxZoom: 22,
id: 'ahmedsyd/ckltpaegx2o1b17pt1mn3rruu',

tileSize: 512,
zoomOffset: -1,
accessToken: 'pk.eyJ1IjoiYWhtZWRzeWQiLCJhIjoiY2tsaWttNXd3MGR6djJwbm0yNjh3dTVtdiJ9.LxSvLSwUs6MZdZxym8V9wA'
})
var currentLayer=grayLayer;

var mymap = L.map('mapid',{zoomControl: true}).setView([51.049999, -114.066666], 13);
mymap.addLayer(currentLayer);

mymap.zoomControl.setPosition('topright');



var markers = L.markerClusterGroup();


/////////////////////////////////////////////////////////
function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}





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

// function submitFunction(){
//  var json_dat="{{geocode}}"
//  console.log(json_dat)
// }
// console.log("out of function: " + start_issue_date + ' to ' + end_issue_date);

document.addEventListener("DOMContentLoaded",()=>{
  document.querySelector("#toggleLayer").onclick= function(){
  if(this.value=="Traffic"){
    mymap.removeLayer(grayLayer);
    mymap.addLayer(mylayer);
    this.value="Gray";
    document.querySelector("#toggleLayer").style.backgroundImage = "url('/static/assets/grayLayer.JPG')";
    currentLayer=mylayer;
    
  }
  else if(this.value=="Gray"){
    mymap.removeLayer(mylayer);
    mymap.addLayer(grayLayer);
    this.value="Traffic";
    document.querySelector("#toggleLayer").style.backgroundImage = "url('/static/assets/mylayer.JPG')";
    currentLayer=grayLayer;
  }
  };
});

document.addEventListener("DOMContentLoaded",()=>{
  document.querySelector("#form").onsubmit= ()=>{
        

        const request= new XMLHttpRequest();
        const daterange= document.querySelector("#daterange").value
        console.log(daterange)
        request.open("POST",'/search');


        //callback fucntion when request completes
        request.onload=()=>{
          var oms = new OverlappingMarkerSpiderfier(mymap);
          var popup = new L.Popup();
          oms.addListener('click', function(marker) {
          popup.setContent(marker.desc);
          popup.setLatLng(marker.getLatLng());
          mymap.openPopup(popup);
          });
          oms.addListener('spiderfy', function(markers) {
              mymap.closePopup();
          });
          
          markers.clearLayers();
          const json_date=JSON.parse(request.responseText);
          
          console.log(json_date)
          if (isEmpty(json_date) || (json_date.features.length==0)){
            alert("No building permits for this date range.");
            return false;
        }


        for (i=0; i<json_date.features.length;i++){
          // console.log("json data geometry:"+json_date.features[i].geometry.coordinates);
          // console.log("json data properties issueddate:"+json_date.features[i].properties.issueddate);
          var datum=json_date.features[i];
          var loc = new L.LatLng(datum.geometry.coordinates[1], datum.geometry.coordinates[0]);
          var marker = new L.Marker(loc);
          var popcontent="issueddate: "+datum.properties.issueddate+"<br>"+
                          "workclassgroup: "+datum.properties.workclassgroup+"<br>"+
                          "contractorname: "+datum.properties.contractorname+"<br>"+
                          "communityname: "+datum.properties.communityname+"<br>"+
                          "originaladdress: "+datum.properties.originaladdress;
          marker.desc = popcontent;//popcontent
          // mymap.addLayer(marker);
          oms.addMarker(marker);
  
          markers.addLayer(marker);
          
  
      }
      mymap.addLayer(markers);

        };

       //add data to send with request 
       const data= new FormData();
       data.append("daterange",daterange); ///like a dictinary

       //send the request to flask 
       request.send(data);

       return false;
  };
});


// var baseMaps = {
//   "mylayer": mylayer
// };
// L.control.layers(baseMaps).addTo(mymap);





// L.mapbox.accessToken = "pk.eyJ1IjoiYWhtZWRzeWQiLCJhIjoiY2tsaWttNXd3MGR6djJwbm0yNjh3dTVtdiJ9.LxSvLSwUs6MZdZxym8V9wA";
// L.mapbox.styleLayer('mapbox://styles/ahmedsyd/ckltpaegx2o1b17pt1mn3rruu').addTo(mymap);
//add zoom control with your options

//the first method to add geojson object
// var geojsonFeature = {
//     "type": "Feature",
//     "properties": {
//         "name": "Coors Field",
//         "amenity": "Baseball Stadium",
//         "popupContent": "This is where the Rockies play!"
//     },
//     "geometry": {
//         "type": "Point",
//         "coordinates": [51.05, -114.0]
//     }
// };

