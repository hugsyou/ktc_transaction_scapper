/**
 * Check [String Date] Value from KTC Transaction
 * @param {string} inputCheck 
 */
const isKTCDate = (inputCheck) => {
    if (typeof inputCheck != 'string') { return false; }
    else if (inputCheck.length !== 8) { return false; }
    else if (inputCheck.replace(/[0-9\/]/ig, '').length !== 0) { return false; }
    else if (inputCheck.replace(/[^\/]/ig, '').length !== 2) { return false; }
    else if (inputCheck.replace(/[\/]/ig, '').length !== 6) { return false; }
    else {
        return true;
    }
};

module.exports = isKTCDate;