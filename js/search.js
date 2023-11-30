function initializeSearch(MigrationInfo, events) {
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

  //
  // 

  const newEvent = new CustomEvent('filter-countries', { detail: { filteredCountries }});
  events.dispatchEvent(newEvent);
}

export {
  initializeSearch,
};
