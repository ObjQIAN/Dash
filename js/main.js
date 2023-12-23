import { initializeMap } from './map.js';
import { initializeList } from './list.js';
import { initializeSearch } from './search.js';
import { initializeContinentFilter } from './filterCon.js'; 
import { initializeplot } from './plot.js';
import { updateUrl } from './updateUrl.js';

const MigrationInfoResp = await fetch('https://raw.githubusercontent.com/ObjQIAN/story-map-project-SW/main/templates/grnImFinal.geojson');
const MigrationInfo = await MigrationInfoResp.json();
var countryToPlot = [];
const events = new EventTarget();


function initializeFromUrl(events) {
    const params = new URLSearchParams(window.location.search);
    const countryToPlotProto = params.get('country');
    if (countryToPlotProto) {
      // Split the countryToPlot string into an array and handle it
      countryToPlot = countryToPlotProto.split(',');
      console.log(countryToPlot);
      const loadPage = new CustomEvent('loadPage', { detail: { countryToPlot } });
      events.dispatchEvent(loadPage);
      // Now trigger the necessary actions with this countries array
      // For example, you might want to update the UI or trigger other functions
    };
    
  }
  
  // When the page loads
  document.addEventListener("DOMContentLoaded", initializeFromUrl(events));


initializeMap(MigrationInfo, events);
initializeList(MigrationInfo, events,countryToPlot);
initializeSearch(MigrationInfo, events);
initializeContinentFilter(MigrationInfo, events);
initializeplot(MigrationInfo, events,countryToPlot);
updateUrl(events) ;
