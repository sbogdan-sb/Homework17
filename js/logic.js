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
});

function setRadius(mag) {
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

function getColor(d) {
  return d >= 5 ? "#800026" :
         d >= 4 ? "#BD0026" :
         d >= 3 ? "#E31A1C" :
         d >= 2 ? "#FC4E2A" :
         d >= 1 ? "#FEB24C" :
                  "#FFEDA0";
}

var legend = L.control({position: "bottomright"});

legend.onAdd = function (map) { 
  var div = L.DomUtil.create("div", "info legend"),
  mag = [0,1,2,3,4,5];
  for (var i = 0; i < mag.length; i++) {
    div.innerHTML += '<i style=”background:' + getColor(mag[i]) + '”></i> ' + mag[i] + (mag[i + 1] ? '&ndash;' + mag[i + 1] + '<br>' : '+');
    }
    return div
} 

legend.addTo(Map);