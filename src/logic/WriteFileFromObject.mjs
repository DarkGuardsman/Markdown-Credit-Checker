import fileSystem from "fs";

/**
 * Converts the objects into lines and writes them to file
 *
 * @param {String} outputFilePath - path to write files toward
 * @param {String} outputFileName - prefix name of the file
 * @param {Array.<CreditEntry>} entries - objects to write
 * @return {void}
 */
export default function writeFileFromObject(outputFilePath, outputFileName, entries) {

    const prefixPath = `${outputFilePath}${outputFilePath.endsWith("/") ? "" : "/"}${outputFileName}`

    // Column data
    const columns = ["File name", "Type", "Date Added", "Author", "License/Owner", "Notes"];
    const columnSizes = columns.map(s => s.length);

    // Figure out column sizes
    entries.forEach(entry => {
        columnSizes[0] = getGreater(entry.assetPath, columnSizes[0]);
        columnSizes[1] = getGreater(entry.type, columnSizes[1]);
        columnSizes[2] = getGreater(entry.date, columnSizes[2]);
        columnSizes[3] = getGreater(entry.author, columnSizes[3]);
        columnSizes[4] = getGreater(entry.license, columnSizes[4]);
        columnSizes[5] = getGreater(entry.notes, columnSizes[5]);
    });

    //Convert entries into lines
    const outputLines = entries.sort(compareEntries).map(entry => {
          return "|"
            + formatCell(entry.assetPath, columnSizes[0]) + "|"
            + formatCell(entry.type, columnSizes[1])  + "|"
            + formatCell(entry.date, columnSizes[2])  + "|"
            + formatCell(entry.author, columnSizes[3])  + "|"
            + formatCell(entry.license, columnSizes[4])  + "|"
            + formatCell(entry.notes, columnSizes[5])  + "|"
      }
    );

    const outputText = `# Generated Credits Output\n\n`
        + `Created on ${new Date().toISOString().slice(0, 10)} from parsed entries\n\n`
        + `\n\n`
        + "## Files\n\n"
        //header
        + "|" + columns.map((c, i) => formatCell(c, columnSizes[i])).join("|") + "|\n"
        + "|" + columns.map((c, i) => "-".repeat(columnSizes[i] + 2)).join("|") + "|\n"
        //body
        + outputLines.join("\n")

    fileSystem.writeFileSync(`${prefixPath}.md`, outputText);
}

function formatCell(line, width) {
    if(line === null || line === undefined) {
        return " ".repeat(width + 2);
    }
    return ` ${line.padEnd(width)} `;
}

/**
 *
 * @param {CreditEntry} a
 * @param {CreditEntry} b
 * @returns {number}
 */
function compareEntries(a, b) {
    return a.assetPath.localeCompare(b.assetPath);
}

/**
 *
 * @param {String} line
 * @param {Number} currentMax
 * @return {Number}
 */
function getGreater(line, currentMax) {
    if(line === null || line === undefined) {
        return currentMax;
    }
    return line.length > currentMax ? line.length : currentMax;
}