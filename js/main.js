import { initializeMap } from './map.js';
import { initializeList } from './list.js';
import { initializeSearch } from './search.js';
import { initializeContinentFilter } from './filterCon.js'; 
import { initializeplot } from './plot.js';

const MigrationInfoResp = await fetch('https://raw.githubusercontent.com/ObjQIAN/story-map-project-SW/main/templates/grnImFinal.geojson');
const MigrationInfo = await MigrationInfoResp.json();

const events = new EventTarget();

initializeMap(MigrationInfo, events);
initializeList(MigrationInfo, events);
initializeSearch(MigrationInfo, events);
initializeContinentFilter(MigrationInfo, events);
initializeplot(MigrationInfo, events);