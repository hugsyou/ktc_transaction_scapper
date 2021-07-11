/**
 * @typedef {import('../Types/KTCTransaction.types').TransactionKTC} TransactionKTC
 * @typedef {import('../Types/KTCTransaction.types').TransactionKTC_Converted} TransactionKTC_Converted
 */

/**
 * Render and Get KTC Transaction
 * @param {import('puppeteer').Browser} browser 
 * @param {object} param1
 * @param {string} param1.KTC_Useranme
 * @param {string} param1.KTC_Password
 * @param {object} param2 - Options
 * @param {boolean} param2.convertPrice - Contert KTC Transaction Price from [String] to [Number]
 */
 const getKTCTransaction = async (browser, { KTC_Useranme, KTC_Password }, { convertPrice }) => {

    const {
        isKTCDate: _isKTCDate,
        isKTCStore: _isKTCStore,
        isKTCPrice: _isKTCPrice,
    } = require('../KTCValidateType');

    const page = await browser.newPage();

    await page.goto('https://www.ktc.co.th/portal/index?account/login', { waitUntil: 'networkidle0' });

    await page.type('input[id="username"], input[name="username"]', KTC_Useranme);
    await page.type('input[id=pwd], input[name="pwd"]', KTC_Password);
    await page.waitForSelector('button[id="btnlogin"]:enabled');
    await page.click('button[id="btnlogin"]:enabled', { delay: 200 });
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    await page.goto('https://www.ktc.co.th/consumer/index?cardInfo/cardInfo', { waitUntil: 'networkidle0' });
    let getTransactionKTC = await page.evaluate(() => {
        const Rs = [];
        const transactionDivTag = document.getElementById("section-card-01");
        const transactionTableTag = transactionDivTag.getElementsByTagName("table")[4];

        for (let indexRow = 0; indexRow < transactionTableTag.rows.length; indexRow++) {
            if (indexRow === 0) { // Skip Header
                continue;
            }
            const transactionTableRowsTag = transactionTableTag.rows[indexRow];

            /**
             * @type {TransactionKTC}
             */
            const Result = {};
            for (let indexCell = 0; indexCell < transactionTableRowsTag.cells.length; indexCell++) {
                const transactionTableRowsCellTag = transactionTableRowsTag.cells[indexCell];
                switch (indexCell) {
                    case 0: // วันที่ทำรายการ
                        {
                            Result.date = transactionTableRowsCellTag.innerText;
                        }
                    case 1: // วันที่บันทึก
                        {
                            break;
                        }
                    case 2: // รายการ
                        {
                            Result.store = transactionTableRowsCellTag.innerText;
                            break;
                        }
                    case 3: // จำนวนเงิน
                        {
                            Result.price = transactionTableRowsCellTag.innerText.replace(/[^0-9\,\-\.]/ig, '');
                            break;
                        }
                    default:
                        break;
                }
            }
            Rs.push(Result);
        }
        return Rs;
    });

    const checkKTCDate = async () => {
        const ktcDateError = getTransactionKTC.filter(where => (!_isKTCDate(where.date))).length;
        if (ktcDateError > 0) { throw Error(`ktc: date Error`); }
    };

    const checkKTCStore = async () => {
        const ktcStoreError = getTransactionKTC.filter(where => (!_isKTCStore(where.store))).length;
        if (ktcStoreError > 0) { throw Error(`ktc: store Error`); }
    };

    const checkKTCPrice = async () => {
        const ktcPriceError = getTransactionKTC.filter(where => (!_isKTCPrice(where.price))).length;
        if (ktcPriceError > 0) { throw Error(`ktc: price Error`); }
    };

    await Promise.all([
        checkKTCDate(),
        checkKTCStore(),
        checkKTCPrice(),
    ]);

    // await page.screenshot({ path: 'example.png', fullPage: true }); // Capture Image

    if (!convertPrice) {
        return getTransactionKTC;
    }
    else if (convertPrice) {
        /**
         * @type {TransactionKTC_Converted[]}
         */
        const ConvertTransaction = getTransactionKTC.map(where => (
            {
                date: String(where.date),
                store: String(where.store),
                price: Number(where.price.replace(/[^0-9\.\-]/ig, ''))
            }
        ));
        return ConvertTransaction;
    }
    else {
        throw Error(`Return KTC Transaction failed`);
    }
};


module.exports = getKTCTransaction;