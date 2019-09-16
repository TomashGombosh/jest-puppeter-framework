const DEFAULT_TIMEOUT = 120000; // 2 Minutes
const SCREENSHOT_DIR = '__tests__/screenshots';
const LOGS_DIR = '__tests__/logs'
const log4js = require('log4js');
const data = require('../constanst/data.json');

log4js.configure({
  appenders: { log: { type: 'file', filename: `${LOGS_DIR}/log.txt` } },
  categories: { default: { appenders: ['log'], level: 'trace' } }
});
 
const log = log4js.getLogger('log');

function time(){
  return parseInt(new Date().getTime()/1000)
  }

async function validate( page, urlProd, titleStage, urlStage){
      const titleSelector = 'head > title';
      log.info(``);
      log.info(`Start Test`);
      await page.waitFor(1000);
      await page.goto(urlProd, {
        timeout: DEFAULT_TIMEOUT,
        waitUntil : 'domcontentloaded'
      });


      log.info(`Navigate to the URL ${urlProd}`);
      await page.screenshot({
        path: `${SCREENSHOT_DIR}/${time()}-prod.png`,
        type: 'png'});
      expect(page.url()).toMatch(urlProd);

      let bodyProd = await page.evaluate(() => document.body.textContent);
      log.info(`Get Body from ${urlProd} body is ${bodyProd}`);

      let title = await page.$eval(titleSelector, titleSelector => titleSelector.innerHTML);
      log.info(`Get title from URL ${urlProd} - actual: ${title}, expected: ${titleStage}`);

      expect(title).toContain(titleStage);

      await page.waitFor(1000);
      log.info(`Navigate to the URL ${urlStage}`);
      await page.goto(urlStage, {
        timeout: DEFAULT_TIMEOUT,
        waitUntil : 'domcontentloaded'
      });

      await page.screenshot({
        path: `${SCREENSHOT_DIR}/${time()}-stage.png`,
        type: 'png'});

      let bodyStage = await page.evaluate(() => document.body.textContent);
      log.info(`Get Body from ${urlStage} body is ${bodyStage}`);

      expect(bodyStage).toContain(bodyProd);
      log.info(`Test End`);
      log.info(``);
}

describe(
  '/ (Home Page)',
  () => {
    let page
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage()

    }, DEFAULT_TIMEOUT)

    afterAll(async () => {
      await page.close()
    })

    test('should load without error', async () => {
        await validate(page, data.first.prod, data.first.title, data.first.stage);
    })
  },
  DEFAULT_TIMEOUT
)
