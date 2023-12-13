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

  const plotLayer = L.layerGroup();
  plotLayer.addTo(map);

  updateWorldMap(MigrationInfo.features, CountryLayer,LineLayer,plotLayer); // add all the countries to the map

  events.addEventListener('filter-countries', (evt) => { 
    const filteredCountries = evt.detail.filteredCountries;
    updateWorldMap(filteredCountries, CountryLayer,LineLayer,plotLayer);
  });

  return map;
}


function updateWorldMap(geojsonData, CountryLayer, LineLayer, plotLayer) {
  CountryLayer.clearLayers(); 
  LineLayer.clearLayers(); 
  plotLayer.clearLayers();


  const greenlandCoords = [71.706936, -42.604303];
  
  const geoJsonLayer = L.geoJSON(geojsonData, {
    onEachFeature: function (feature, layer) {
      if (feature.properties) {
        
        const popupContent = `
          <h2 class="country-name">${feature.properties.To_Country}</h2>
          <canvas id="mypieChart1"></canvas> 
          <p class="continent">Continent: ${feature.properties.continent}</p>
          <p class="area_km2">Area (km<sup>2</sup>): ${feature.properties.area_km2.toLocaleString()}</p>
          <p class="pop">Population: ${feature.properties.pop.toLocaleString()}</p>
          <p class="lifeExp">Life Expectancy: ${feature.properties.lifeExp.toFixed(2)}</p>
          <p class="gdpPercap">GDP per Capita: $${feature.properties.gdpPercap.toFixed(2)}</p>
        `;

       
        layer.bindPopup(popupContent);

      }

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

        geoJsonLayer.eachLayer(function (otherLayer) {
          if (otherLayer !== e.target) {
            geoJsonLayer.resetStyle(otherLayer);
          }
        });
      
        LineLayer.clearLayers();
        LineLayer.addLayer(polyline);
        updatePieChartWithFilteredCountries(feature);
      });
    },
    style: {
      color: 'blue', 
      fillColor: '#f2f2f2',
      fillOpacity: 0.2, 
      weight: 2
    }
  }).addTo(CountryLayer);
  

  geoJsonLayer.on('popupclose', function (e) {
    geoJsonLayer.resetStyle(e.target);
    LineLayer.clearLayers(); // Remove the line when the popup is closed
    
  });
}
//updatePieChartWithFilteredCountries(feature.properties);
let pieChart1;
function updatePieChartWithFilteredCountries(filteredCountries) {
  //How to remove all the data from the chart??
 
  if (pieChart1) {
    pieChart1.destroy();
  }
  
  const ctx4 = document.getElementById('mypieChart1').getContext('2d');
  
  const selectedCountry = filteredCountries;
  const years = Object.keys(selectedCountry.properties.migdata);
  const menImmigrationData = years.map(year => {
    const yearData = selectedCountry.properties.migdata[year];
    return yearData[0].MenImmigrations;
  });

  pieChart1 = new Chart(ctx4, {
    type: 'bar',
    data: {
      labels: years,
      datasets: [{
        label: `Men Immigrations in ${selectedCountry.properties.To_Country}`,
        data: menImmigrationData,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        },
        
      }
    }
  });
}



export {
  initializeMap,
};
