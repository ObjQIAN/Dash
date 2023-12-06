function initializeMap(MigrationInfo, events) {
  const map = L.map('map').setView([39.95, -75.16], 3); // center of Philadelphia

  L.tileLayer('https://api.mapbox.com/styles/v1/ltscqian/clop0wsxp00cr01qq0kjz1du0/tiles/256/{z}/{x}/{y}@2x?access_token={apiKey}', {
    apiKey: 'pk.eyJ1IjoibHRzY3FpYW4iLCJhIjoiY2t1MGhqcDc2MWU2dzJ1dGh1MnRlanJkYiJ9.evZuw4tNS1sR4QF9vta6xQ',
    maxZoom: 14,
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
  }).addTo(map);

  const CountryLayer = L.layerGroup(); 
  CountryLayer.addTo(map); 

  const LineLayer = L.layerGroup(); 
  LineLayer.addTo(map); 

  updateWorldMap(MigrationInfo.features, CountryLayer,LineLayer); // add all the countries to the map

  events.addEventListener('filter-countries', (evt) => { 
    const filteredCountries = evt.detail.filteredCountries;
    updateWorldMap(filteredCountries, CountryLayer,LineLayer);
  });

  return map;
}


function updateWorldMap(geojsonData, CountryLayer, LineLayer) {
  CountryLayer.clearLayers(); 
  LineLayer.clearLayers(); 


  const greenlandCoords = [71.706936, -42.604303];

  const geoJsonLayer = L.geoJSON(geojsonData, {
    onEachFeature: function (feature, layer) {
      if (feature.properties) {
        
        const popupContent = `
          <h2 class="country-name">${feature.properties.To_Country}</h2>
          <canvas id="pieChart1"></canvas> 
          <p class="continent">Continent: ${feature.properties.continent}</p>
          <p class="area_km2">Area (km<sup>2</sup>): ${feature.properties.area_km2.toLocaleString()}</p>
          <p class="pop">Population: ${feature.properties.pop.toLocaleString()}</p>
          <p class="lifeExp">Life Expectancy: ${feature.properties.lifeExp.toFixed(2)}</p>
          <p class="gdpPercap">GDP per Capita: $${feature.properties.gdpPercap.toFixed(2)}</p>
        `;
        //updatePieChartWithFilteredCountries(feature.properties);
        layer.bindPopup(popupContent);
      }

      // Add a click event listener to the layer
      layer.on('click', function (e) {
        e.target.setStyle({
          color: 'yellow', 
          fillColor: 'orange',
          fillOpacity: 0.7, 
          weight: 2 
        });

        // Draw a line from Greenland to the clicked country
        const clickedCountryCoords = e.latlng;
        const latlngs = [greenlandCoords, [clickedCountryCoords.lat, clickedCountryCoords.lng]];
        const polyline = L.polyline(latlngs, { color: 'red' }).addTo(LineLayer);

        // Center the map on the clicked country
       // e.target._map.fitBounds(e.target.getBounds());

        // To ensure the style resets when clicking on another feature
        geoJsonLayer.eachLayer(function (otherLayer) {
          if (otherLayer !== e.target) {
            geoJsonLayer.resetStyle(otherLayer);
          }
        });

        // Remove the previous line if any
        LineLayer.clearLayers();
        // Add the new line to the map
        LineLayer.addLayer(polyline);
      });
    },
    style: {
      color: 'blue', // Initial border color
      fillColor: '#f2f2f2', // Initial fill color
      fillOpacity: 0.2, // Initial fill opacity
      weight: 2 // Initial border width
    }
  }).addTo(CountryLayer);
  

  geoJsonLayer.on('popupclose', function (e) {
    geoJsonLayer.resetStyle(e.target);
    LineLayer.clearLayers(); // Remove the line when the popup is closed
  });
}



export {
  initializeMap,
};
