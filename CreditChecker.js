import fs from "fs";
import minimist from 'minimist'
import Lodash from 'lodash';


console.log('Args', process.argv);

const argv = minimist(process.argv.slice(2)); 