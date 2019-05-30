var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

d3.json(url, d => {
  //builds our geojson layer
  var earthquakes = L.geoJSON(d.features, {
    pointToLayer: (feature, latlng) => L.circleMarker(latlng,
      {
        radius: setRadius(feature.properties.mag),
        fillColor: setColor(feature.properties.mag),
        color: setColor(feature.properties.mag),
        weight: 3,
        opacity: .8,
        fillOpacity: .4
      }).bindPopup("Magnitude: " + feature.properties.mag)
  }).addTo(Map);

  // console.log(d.features)
});

function setRadius(mag) {
  // console.log(mag);
  return mag * 7;
}

function setColor(mag) {
  switch (true) {
    case mag < 1:
      return "#B1FF33";
    case mag < 2:
      return "#FFC300";
    case mag < 3:
      return "#FF5733";
    case mag < 4:
      return "#C70039";
    case mag < 5:
      return "#900C3F";
    default:
      return "#581845  ";
  }
}






// function getColor(d) {
//   return d > 5 ? '#800026' :
//          d > 4 ? '#BD0026' :
//          d > 3 ? '#E31A1C' :
//          d > 2 ? '#FC4E2A' :
//          d > 1 ? '#FEB24C' :
//                  '#FFEDA0';
// }


// Create our map, giving it the streetmap and earthquakes layers to display on load
var Map = L.map("map", {
  center: [40, -98],
  zoom: 4
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(Map);


var legend = L.control({position: 'bottomright'});
    legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend');
    labels = ['<strong>Categories</strong>'],
    categories = ['Road Surface','Signage','Line Markings','Roadside Hazards','Other'];

    for (var i = 0; i < categories.length; i++) {

            div.innerHTML += 
            labels.push(
                '<i class="circle" style="background:' + getColor(categories[i]) + '"></i> ' +
            (categories[i] ? categories[i] : '+'));

        }
        div.innerHTML = labels.join('<br>');
    return div;
    };
    legend.addTo(Map);

    function getColor(d) {
      return d === 'Road Surface'  ? "#de2d26" :
             d === 'Signage'  ? "#377eb8" :
             d === 'Line Markings' ? "#4daf4a" :
             d === 'Roadside Hazards' ? "#984ea3" :
                          "#ff7f00";
    }
    