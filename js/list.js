function initializeList(MigrationInfo, events,countryToPlot) {
  updateCountryList(MigrationInfo.features, events,countryToPlot);

  events.addEventListener('filter-countries', (evt) => {
    const filteredCountries = evt.detail.filteredCountries;
    updateCountryList(filteredCountries, events,countryToPlot);
  });

  checkIfClearCountryFilter(countryToPlot) 
}

function checkIfClearCountryFilter(countryToPlot){ 
  const clearButton = document.getElementById('clear-country-filter');
  const paragraph = document.querySelector('#selected-countries');
  
  clearButton.addEventListener('click', () => {
    countryToPlot.length = 0; 
    paragraph.textContent = 'Selected Countries: ' + countryToPlot.join(', ');
    document.querySelectorAll('.country-checkbox').forEach(checkbox => {
      checkbox.checked = false;
    });
  });

}

function updateCountryList(countries, events,countryToPlot) {
  const countryList = document.querySelector('#country-list'); 
  let html = '';

  for (const country of countries) {
    html += `
      <li>
        <input type="checkbox" class="country-checkbox" value="${country.properties.To_Country}">
        ${country.properties.To_Country} 
      </li>
    `;
  }
  countryList.innerHTML = html;


  document.querySelectorAll('.country-checkbox').forEach(checkbox => {
    if(countryToPlot.includes(checkbox.value)){
      checkbox.checked = true;};
    checkbox.addEventListener('change', () => {handleCheckboxChange(events,countryToPlot)});
  });
}

function handleCheckboxChange(events,countryToPlot) {

  document.querySelectorAll('.country-checkbox').forEach(checkbox => {
    if(!checkbox.checked && countryToPlot.includes(checkbox.value)){
      countryToPlot = countryToPlot.filter(item => item !== checkbox.value);};
    if(checkbox.checked && !countryToPlot.includes(checkbox.value)){
        countryToPlot.push(checkbox.value);
      }
  } );

  // Update the paragraph with selected country names
  const paragraph = document.querySelector('#selected-countries');
  paragraph.textContent = 'Selected Countries: ' + countryToPlot.join(', ');
  console.log(countryToPlot);
}

export {
  initializeList,
};

