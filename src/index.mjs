import minimist from "minimist";
import { loadFileAsObjects } from "./logic/LoadFileAsObjects.mjs";
import { loadFilesInDirectory } from "./logic/LoadFilesInDirectory.mjs";
import writeFileFromObject from "./logic/WriteFileFromObject.mjs";

console.log("Args", process.argv);

// Get args
const argv = minimist(process.argv.slice(2));
const assetsFolder = argv.assetFolder;

// Load credits
const creditEntries = loadFileAsObjects(assetsFolder + "/Credits.md");

console.log("Credits Loaded: " + creditEntries.length);

// Load all nested files
const files = loadFilesInDirectory(assetsFolder, [])
  // Ignore file types
  .filter(path => !path.endsWith(".md") && !path.endsWith(".mcmeta")) //TODO convert to argv
  // Remove directory prefix
  .map(path => path.replace(assetsFolder, "")
    //Fix path to be relative and matching format for compare
    .replaceAll("\\", "/").replace("/", ""))
  //Filter out ignored folders
  .filter(path => !path.startsWith("recipes") && !path.startsWith("blockstates") && !path.startsWith("lang")); //TODO convert to argv

console.log("Files detected: " + files.length);

// Check for credits missing files
const missingFiles = creditEntries.filter(entry => !files.includes(entry.assetPath));
console.log("Missing files: " + missingFiles.length + "\n\t" + missingFiles.map(e => e.assetPath).join("\n\t"));


// Check for files lacking credit entries
const missingCredits = files.filter(f => !creditEntries.find(e => e.assetPath === f));
console.log("Missing credits: " + missingCredits.length + "\n\t" + missingCredits.join("\n\t"));

// Convert all files into credit entries for export
const outputEntries = [...creditEntries];
missingCredits.forEach(file => {
  outputEntries.push({
    assetPath: file
  });
})
writeFileFromObject(assetsFolder, "_generated_credits.md", outputEntries);