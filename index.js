const KTC_Useranme = ''; // <== Input KTC Username
const KTC_Password = ''; // <== Input KTC Password


(async () => {
    const puppeteer = require('puppeteer');

    const {
        writeJSONFile,
    } = require('./Misc');

    const {
        getKTCTransaction,
    } = require('./KTCTransaction');

    const browser = await puppeteer.launch({
        headless: true, // Dont show Browser when run this app --- { headless: true }
        args: [
            '--incognito', // Open Browser with [incognito] Option --- { args: ['--incognito'] }
        ]
    });

    await getKTCTransaction(browser, { KTC_Useranme, KTC_Password }, { convertPrice: true }) // Scraping KTC Transaction and ConvertOutput [Price] to Object Number
        .then(result1 => {
            console.log(result1);
            return result1;
        })
        .then(async (result2) => { // Write Output to JSON File
            await writeJSONFile(result2, 'Output.json');
        })
        .catch(error => console.error(error));

    await browser.close();
})();