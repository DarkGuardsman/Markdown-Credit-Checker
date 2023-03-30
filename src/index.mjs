import minimist from 'minimist'
import { loadFileAsObjects } from "./logic/LoadFileAsObjects.mjs";

console.log('Args', process.argv);

// Get args
const argv = minimist(process.argv.slice(2));
const assetsFolder = argv.assetFolder;

//Load credits
const creditEntries = loadFileAsObjects(assetsFolder + "/Credits.md");

console.log("Credits Loaded: " + creditEntries.length);