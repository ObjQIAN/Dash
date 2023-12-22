function initializeplot(MigrationInfo, events) {
  
  events.addEventListener('plotChange', function(event) {
    const countryToPlot = event.detail.countryToPlot;
    //console.log(countryToPlot);
    handleSearchBoxInput(countryToPlot, MigrationInfo,events);
    // Process countryToPlot
  });

  events.addEventListener('plotStop', function(event) {
    const countryToPlot = event.detail.countryToPlot;
    //console.log(countryToPlot);
    handleSearchBoxInput(countryToPlot, MigrationInfo,events);
    // Process countryToPlot
  });
}

function handleSearchBoxInput(countryToPlot, MigrationInfo, events) {
  updateFilteredCountries(countryToPlot, MigrationInfo, events);
}

function updateFilteredCountries(countryToPlot, MigrationInfo, events) {
  const searchBox = countryToPlot;
 
  
  const filteredCountries = [];
  const filteredCountriesMig = {};
  for (const country of MigrationInfo.features) {
    if (searchBox.includes(country.properties.To_Country)) {
      filteredCountries.push(country);
  
      // Aggregate the data for migdata
      for (const year in country.properties.migdata) {
        if (!filteredCountriesMig[year]) {
          filteredCountriesMig[year] = {
            MenImmigrations: 0,
            WomenImmigrations: 0,
            MenEmigrations: 0,
            WomenEmigrations: 0
          };
        }
  
        const yearData = country.properties.migdata[year][0];
        filteredCountriesMig[year].MenImmigrations += yearData.MenImmigrations || 0;
        filteredCountriesMig[year].WomenImmigrations += yearData.WomenImmigrations || 0;
        filteredCountriesMig[year].MenEmigrations += yearData.MenEmigrations || 0;
        filteredCountriesMig[year].WomenEmigrations += yearData.WomenEmigrations || 0;
      }
    }
  };
  
 /* for (const country of MigrationInfo) {
    if (country.properties.To_Country.includes(searchBox)) {
      filteredCountries.push(country);
    }
  };*/
  console.log(filteredCountriesMig);
  const newEvent = new CustomEvent('filter-countries', { detail: { filteredCountries } });
  events.dispatchEvent(newEvent);
  

  updateChartWithFilteredCountries(filteredCountriesMig);
}

let chart1 = null;
let chart2 = null;
let chart3 = null;
let chart4 = null;
function updateChartWithFilteredCountries(filteredCountries) {

  if (chart1) {
    chart1.destroy();
  }
  if (chart2) {
    chart2.destroy();
  }
  if (chart3) {
    chart3.destroy();
  }
  if (chart4) {
    chart4.destroy();
  }
  const ctx1 = document.getElementById('myChart').getContext('2d');
  const ctx2 = document.getElementById('myChart2').getContext('2d');
  const ctx3 = document.getElementById('myChart3').getContext('2d');
  const ctx4 = document.getElementById('myChart4').getContext('2d');



  const selectedCountry = filteredCountries;

 // const years = Object.keys(filteredCountries);
  //return sum of all the values in an array
  

  let menImmigrationData = [];
  let womenImmigrationData = [];
  let menEmigrationData = [];
  let womenEmigrationData = [];

  const years = Object.keys(filteredCountries);

  // Extract data for each year
  years.forEach(year => {
    const yearData = filteredCountries[year];
    menImmigrationData.push(yearData.MenImmigrations || 0);
    womenImmigrationData.push(yearData.WomenImmigrations || 0);
    menEmigrationData.push(yearData.MenEmigrations || 0);
    womenEmigrationData.push(yearData.WomenEmigrations || 0);
  });
  
/*
  const menImmigrationData = years.map(year => {
    const yearData = filteredCountries[year];
    return yearData[0].MenImmigrations;
  });
  const womenImmigrationData = years.map(year => {
    const yearData = filteredCountries[year];
    return yearData[0].WomenImmigrations;
  });
  const menEmigrationData = years.map(year => {
    const yearData = filteredCountries[year];
    return yearData[0].MenEmigrations;
  });
  const WomenEmigrationData = years.map(year => {
    const yearData = filteredCountries[year];
    return yearData[0].WomenEmigrations;
  });*/


  chart1 = new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: years,
      datasets: [{
        label: `Men Immigrations in`,
        data: menImmigrationData,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });


  chart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: years,
      datasets: [{
        label: `Women Immigrations in `,
        data: womenImmigrationData,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });


  chart3 = new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: years,
      datasets: [{
        label: `Men Emigrations in `,
        data: menEmigrationData,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });


  chart4 = new Chart(ctx4, {
    type: 'bar',
    data: {
      labels: years,
      datasets: [{
        label: `Women Emigrations in `,
        data: womenEmigrationData,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}



export {
  initializeplot,
};

