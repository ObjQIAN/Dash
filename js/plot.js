function initializeplot(MigrationInfo, events) {
  const searchBox = document.querySelector('#country-name-filter');
  searchBox.addEventListener('input', (evt) => {
    handleSearchBoxInput(evt, MigrationInfo.features, events);
  });

}

function handleSearchBoxInput(evt, MigrationInfo, events) {
  updateFilteredCountries(MigrationInfo, events);
}

function updateFilteredCountries(MigrationInfo, events) {
  const searchBox = document.querySelector('#country-name-filter');
  const lowercaseValue = searchBox.value.toLowerCase();

  const filteredCountries = [];
  for (const country of MigrationInfo) {
    if (country.properties.To_Country.toLowerCase().includes(lowercaseValue)) {
      filteredCountries.push(country);
    }
  }

  const newEvent = new CustomEvent('filter-countries', { detail: { filteredCountries } });
  events.dispatchEvent(newEvent);
  updateChartWithFilteredCountries(filteredCountries);
}

let chart1 = null;
let chart2 = null;
let chart3 = null;
let chart4 = null;
function updateChartWithFilteredCountries(filteredCountries) {
  //How to remove all the data from the chart??

  /*ctx1.clearRect(0, 0, canvas.width, canvas.height);
  ctx2.clearRect(0, 0, canvas.width, canvas.height);
  ctx3.clearRect(0, 0, canvas.width, canvas.height);
  ctx4.clearRect(0, 0, canvas.width, canvas.height);*/
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



  const selectedCountry = filteredCountries[0];
  const years = Object.keys(selectedCountry.properties.migdata);
  const menImmigrationData = years.map(year => {
    const yearData = selectedCountry.properties.migdata[year];
    return yearData[0].MenImmigrations;
  });
  const womenImmigrationData = years.map(year => {
    const yearData = selectedCountry.properties.migdata[year];
    return yearData[0].WomenImmigrations;
  });
  const menEmigrationData = years.map(year => {
    const yearData = selectedCountry.properties.migdata[year];
    return yearData[0].MenEmigrations;
  });
  const WomenEmigrationData = years.map(year => {
    const yearData = selectedCountry.properties.migdata[year];
    return yearData[0].WomenEmigrations;
  });


  chart1 = new Chart(ctx1, {
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
        }
      }
    }
  });


  chart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: years,
      datasets: [{
        label: `Women Immigrations in ${selectedCountry.properties.To_Country}`,
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
        label: `Men Emigrations in ${selectedCountry.properties.To_Country}`,
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
        label: `Women Emigrations in ${selectedCountry.properties.To_Country}`,
        data: WomenEmigrationData,
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

