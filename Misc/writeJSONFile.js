/**
 * Wire JSON File
 * @param {object} inputObject 
 * @param {string} pathFile - must be end with ".json" Example: "output.json"
 */
const writeJSONFile = async (inputObject, pathFile) => {

    const fs = require('fs').promises;

    const path = require('path');

    const moment = require('moment');

    const {
        isArray: _isArray,
        isString: isString,
    } = require('lodash');

    if (!_isArray(inputObject)) { throw Error(`<inputObject> is not Array`); }
    else {
        let newPathFile;
        if (!isString(pathFile) || path.basename(path.join(pathFile)).replace(/[^\.json]/ig, '') !== '.json') {
            const getCurrentTime = moment().format('YYYYMMDD_hhmm_ss');
            newPathFile = path.join(`Output_${getCurrentTime}.json`);
        }
        else {
            newPathFile = path.join(pathFile)
        }
        await fs.writeFile(path.join(newPathFile), JSON.stringify(inputObject), { encoding: 'utf-8' });
    }
};

module.exports = writeJSONFile;