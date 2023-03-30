import fileSystem from "fs";
import lodash from "lodash";

/**
 * Converts the objects into lines and writes them to file
 *
 * @param {String} outputFilePath - path to write files toward
 * @param {String} outputFileName - prefix name of the file
 * @param {Array.<DayEntry>} entries - objects to write
 * @return {void}
 */
export default function writeFileFromObject(outputFilePath, outputFileName, entries) {

    const prefixPath = `${outputFilePath}${outputFilePath.endsWith("/") ? "" : "/"}${outputFileName}`
    //Output json
    const jsonOutput = JSON.stringify(entries, null, 2);
    fileSystem.writeFileSync(`${prefixPath}_metadata.json`, jsonOutput);

    //Output timesheet file
    const outputLines = entries.map(dayEntry => {
            const lines = convertProjectHoursIntoLines(dayEntry.projectHours);
            return "### " + dayEntry.date + "\n\n"
                + `**Total Hours:** ${dayEntry.totalHours.toFixed(2)}h\n\n`
                + `**OOO:** ${dayEntry.outOfOffice.toFixed(2)}h\n\n`
                + "| Project | Hours |\n"
                + "| --- | --- |\n"
                + lines.join("\n")
        }
    );
    const outputText = `# ${outputFileName}\n\n`
        + `Timesheet generated on ${new Date().toISOString().slice(0, 10)} from parsed note entries\n\n`
        + `**Total Hours:** ${lodash.sum(entries.map(etr => etr.totalHours)).toFixed(2)}\n\n`
        + `**OOO:** ${lodash.sum(entries.map(etr => etr.outOfOffice)).toFixed(2)}h\n\n`
        + "## Times\n\n"
        + outputLines.join("\n\n")
        + "\n"

    fileSystem.writeFileSync(`${prefixPath}.md`, outputText);
}

function convertProjectHoursIntoLines(projectHours) {
    return projectHours.map((projectEntry) => {
        return `| ${projectEntry.name} | ${projectEntry.hours.toFixed(2)} |`;
    });
}