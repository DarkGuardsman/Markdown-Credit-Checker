import Path  from "path";
import FS from "fs";

/**
 * Loads all nested files
 *
 * @param {String} directory to scan
 * @param {Array.<String>} files array to add into
 * @returns {Array.<String>} list of files
 */
export function loadFilesInDirectory(directory, files)
{
  const currentFiles = FS.readdirSync(directory, {withFileTypes: true});
  currentFiles.forEach(file => {
    const absolute = Path.join(directory, file.name);
    if (file.isDirectory()) {
      loadFilesInDirectory(absolute, files);
    }
    else {
      files.push(absolute);
    }
  });
  return files;
}
