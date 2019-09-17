const DEFAULT_TIMEOUT = 120000; // 2 Minutes
const SCREENSHOT_DIR = '__tests__/screenshots';
const LOGS_DIR = '__tests__/logs'
const log4js = require('log4js');
const data = require('../constanst/data.json');

const PROD_URL = 'http://oll.libertyfund.org/pages/';
const STAGE_URL = 'https://jfcote87dev.wpengine.com/pages/'

const TITLE_SELECTOR = '#PageDiv > h1';
const ARTICLE_SELECTOR = 'section.pages';

log4js.configure({
  appenders: { logs: { type: 'file', filename: `${LOGS_DIR}/log-test.log` } },
  categories: { default: { appenders: ['logs'], level: 'trace' } }
});

const testLog = log4js.getLogger('logs');

let i = 0;
let numberOfLinks = Object.keys(data).length;

function time(){
  return parseInt(new Date().getTime()/1000)
  }

async function validate( page, url){
  
  log4js.configure({
    appenders: { log: { type: 'file', filename: `${LOGS_DIR}/log-${url}.txt` } },
    categories: { default: { appenders: ['log'], level: 'trace' } }
  });
  
  const log = log4js.getLogger('log');
  log.info(``);
  log.info(`Test for ${url}`);
  log.info(`Start Test`);

  await page.waitFor(1000);
  await page.goto(`${PROD_URL}/${url}`, {

    timeout: DEFAULT_TIMEOUT,
    waitUntil : 'domcontentloaded'
  });
  log.info(`Navigate to the URL ${PROD_URL}/${url}`);

  let titleProd = await page.$eval(TITLE_SELECTOR, TITLE_SELECTOR => TITLE_SELECTOR.textContent);
  log.info(`Get title from URL ${PROD_URL}/${url} - actual prod title ${titleProd}`);

  let bodyProd = await page.$eval(ARTICLE_SELECTOR, ARTICLE_SELECTOR=> ARTICLE_SELECTOR.textContent);

  await page.screenshot({
    path: `${SCREENSHOT_DIR}/${time()}-${url}-prod.png`,
    type: 'png',
    fullPage: 'true'});

  await page.waitFor(1000);
  await page.goto(`${STAGE_URL}/${url}`, {
    timeout: DEFAULT_TIMEOUT,
    waitUntil : 'domcontentloaded'
  });
  log.info(`Navigate to the URL ${STAGE_URL}/${url}`);

  let titleStage = await page.$eval(TITLE_SELECTOR, TITLE_SELECTOR => TITLE_SELECTOR.textContent);
  log.info(`Get title from URL ${STAGE_URL}/${url} - actual prod title ${titleStage}`);

  let bodyStage = await page.$eval(ARTICLE_SELECTOR, ARTICLE_SELECTOR=> ARTICLE_SELECTOR.textContent);

  await page.screenshot({
    path: `${SCREENSHOT_DIR}/${time()}-${url}-stage.png`,
    type: 'png',
    fullPage: 'true'});
  
  try {

    expect(titleProd.trim()).toContain(titleStage.trim()); 

  } catch(err) {

    testLog.info(`Link: ${url} is failed`);
     
    log.error(`Value ${titleProd} and ${titleStage} `);
    
    log.error(`Test End`);
    log.error(``);
  } 

  try {
    expect(bodyProd.trim()).toContain(bodyStage.trim());
    testLog.info(`Link: ${url} is passed`);
      
    log.info(`Test End`);
    log.info(``);
  } catch(err) {

    testLog.info(`Link: ${url} is failed`);
    log.error(`Value ${bodyProd} and ${bodyStage} `);
    log.error(`Test End`);
    log.error(``);
  }
}

describe(
  '/ (Home Page)',
  () => {
    let page
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage()
      await page.setViewport({width: 1920, height: 1080})
      jest.setTimeout(100000000);

    }, DEFAULT_TIMEOUT)


    test(`Test Script ${data[0].slug}`, async () => {
      while(i<numberOfLinks){
          i++;
          await validate(page, data[i].slug);
      }
    });
  },
  DEFAULT_TIMEOUT
)
