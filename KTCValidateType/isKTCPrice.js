/**
 * Check [Price] Value from KTC Transaction
 * @param {string} inputCheck 
 */
const isKTCPrice = (inputCheck) => {
    if (typeof inputCheck !== 'string') { return false; }
    else {
        const checkDot = inputCheck.replace(/[^\.]/ig, '').length;
        if (checkDot !== 0 && checkDot !== 1) { return false; }
        else {
            const checkNumber = inputCheck.replace(/[0-9\,\-\.]/ig, '').length;
            if (checkNumber > 0) { return false; }
            else {
                return true;
            }
        }
    }
};

module.exports = isKTCPrice;