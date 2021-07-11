const KTC_Useranme = ''; // <== Input KTC Username
const KTC_Password = ''; // <== Input KTC Password


(async () => {
    const puppeteer = require('puppeteer');

    const {
        getKTCTransaction,
    } = require('./KTCTransaction');

    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--incognito',
        ]
    });

    await getKTCTransaction(browser, { KTC_Useranme, KTC_Password }, { convertPrice: true })
        .then(result1 => { console.log(result1); return result1; })
        .then(async (result2) => {
            const writeJSONFile = require('./Misc').writeJSONFile;
            await writeJSONFile(result2, 'Output.json');
        })
        .catch(error => console.error(error));

    await browser.close();
})();