/**
 * Check [Store] Value from KTC Transaction
 * @param {string} inputCheck 
 */
 const isKTCStore = (inputCheck) => {
    if (typeof inputCheck != 'string') { return false; }
    else {
        return true;
    }
};

module.exports = isKTCStore;