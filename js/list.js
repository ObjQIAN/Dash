function initializeList(MigrationInfo, events) {
  updateCountryList(MigrationInfo.features, events);

  events.addEventListener('filter-countries', (evt) => {
    const filteredCountries = evt.detail.filteredCountries;
    updateCountryList(filteredCountries, events);
  });
}

function updateCountryList(countries, events) {
  const countryList = document.querySelector('#country-list'); 
  let html = '';

  for (const country of countries) {
    html += `
    <input type="checkbox" check-id=${country.properties.To_Country} value = ${country.properties.To_Country}>
    <li data-country-id=${country.properties.To_Country}>${country.properties.To_Country} from ${country.properties.continent}</li>
    `;
  }
  countryList.innerHTML = html;

  for (const li of countryList.querySelectorAll('li')) {
    li.addEventListener('mouseover', (evt) => {
      const countryId = evt.target.dataset.countryId;
      const newEvent = new CustomEvent('focus-country', {
        detail: { countryId },
      });
      events.dispatchEvent(newEvent);
    });
  }
}

export {
  initializeList,
};
