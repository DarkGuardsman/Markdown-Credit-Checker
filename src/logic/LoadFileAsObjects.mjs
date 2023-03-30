import fileSystem from "fs";

/**
 * Loads the file from I/O, processes the data, and converts to objects for use.
 *
 * @param {String} filePathIn - location on I/O
 * @return {Array.<CreditEntry>} Loaded entries
 */
export function loadFileAsObjects(filePathIn) {
    return loadFileAsLines(filePathIn).map((line, index) => processLine(line, index));
}

/**
 * Converts the line into an object
 *
 * @param {String} line - line from table
 * @param {Number} index - position from table
 * @return {CreditEntry} object with data from the line
 */
function processLine(line, index) {

    //Ignore empty lines
    if (line === null || line === undefined || line.trim() === '') {
        return undefined;
    }

    //Split line and trim to remove extra spaces
    const cells = line.split("|")
        .map(text => text.trim());

    //validation to notify user to fix issues with files
    if (cells.length !== 8) { // 6 cells, 1 empty front and 1 empty end due to split of '|'
        throw new Error(`Invalid format for line ${index}. Should contain 8 splices but has ${cells.length} cells`);
    }

    const assetPath = cells[1];
    const type = cells[2];
    const date = cells[3];
    const author = cells[4];
    const license = cells[5];
    const notes = cells[6];

    return {
        index,
        assetPath,
        type,
        date,
        author,
        license,
        notes
    }
}

/**
 *
 * @param {String} filePathIn - path to file
 * @return {Array.<String>} lines from the file
 */
function loadFileAsLines(filePathIn) {
    const rawFile = fileSystem.readFileSync(filePathIn, 'utf8'); //TODO error handling?

    //Extract just the time entry area
    const trackingHeaderTarget = "## Files";
    const trackingHeader = rawFile.indexOf(trackingHeaderTarget) + trackingHeaderTarget.length; //Offset by length so we start after
    const nextHeader = rawFile.indexOf("##", trackingHeader);

    if (nextHeader === -1) {
        throw new Error(`Failed to parse section due to missing second header. File: ${filePathIn}`);
    }

    const timeTrackingArea = rawFile.substring(trackingHeader, nextHeader);

    const tableStart = timeTrackingArea.indexOf("|");
    const tableEnd = timeTrackingArea.lastIndexOf("|");
    const tableText = timeTrackingArea.substring(tableStart, tableEnd + 1);

    const tableLines = tableText.split("\n");

    return tableLines.splice(2, tableLines.length + 1);
}