var myMap = L.map("map", {
    center: [19.4326, -99.1332],
    zoom: 5.0
  });
  // Adding tile layer
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: API_KEY
  }).addTo(myMap);
  // Load in geojson data
  var geoData = "static/data/EDOSYTDOCT.geojson";
  var geojson;
  d3.json(geoData).then(data =>{
      console.log(data)
 
  L.choropleth(data, {
	valueProperty: 'VENTA2020', // which property in the features to use
  scale: ['white', 'brown'], // chroma.js scale - include as many as you like
	steps: 100, // number of breaks or steps in range
	mode: 'q', // q for quantile, e for equidistant, k for k-means
	style: {
		color: 'black', // border color
		weight: 0.99,
		fillOpacity: 0.99
	},
	onEachFeature: function(feature, layer) {
		layer.bindPopup(`<h3>Estado: ${feature.properties.ESTADO}<hr> YTD 2020:$${feature.properties.VENTA2020}M<hr> YTD 2019:$${feature.properties.VENTA2019}M<hr><h5>PV Cierre Oct 2020:${feature.properties.PV2020POST}</h5><hr><h5>PV Cierre Oct 2019:${feature.properties.PV2020PRE}</h5></h3> `)
	}
}).addTo(myMap)

  })