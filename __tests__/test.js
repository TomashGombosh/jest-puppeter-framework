const DEFAULT_TIMEOUT = 120000; // 2 Minutes
const SCREENSHOT_DIR = '__tests__/screenshots';
const LOGS_DIR = '__tests__/logs'
const log4js = require('log4js');
const data = require('../constanst/data.json');
const fs = require("fs");
const PROD_URL = 'http://oll.libertyfund.org/pages';
const STAGE_URL = 'https://jfcote87dev.wpengine.com/pages'

const TITLE_SELECTOR = '#PageDiv > h1';
const ARTICLE_SELECTOR = 'section.pages';

let i = 0;
let threads = [
  0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300
];
let numberOfLinks = Object.keys(data).length;

async function takeScrenshooot(page, env){
  await page.screenshot({
    path: `${SCREENSHOT_DIR}/${time()}-${url}-${env}.png`,
    type: 'png',
    fullPage: 'true'});
}

async function navigate(page, url){
  await page.goto(`${url}`, {
    timeout: DEFAULT_TIMEOUT,
    waitUntil : 'domcontentloaded'
  });
}

function rewrite(url, status){
     var obj = {
          link    : url, 
          status : status
        }
    
   fs.appendFile('result.json', JSON.stringify(obj) + ",", function(err){
     if(err) console.log(`error ${err}`);
     console.log(`complete`);
   })
}

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
  await navigate(page, `${PROD_URL}/${url}`)
  log.info(`Navigate to the URL ${PROD_URL}/${url}`);

  let titleProd = await page.$eval(TITLE_SELECTOR, TITLE_SELECTOR => TITLE_SELECTOR.textContent);
  log.info(`Get title from URL ${PROD_URL}/${url} - actual prod title ${titleProd}`);

  let bodyProd = await page.$eval(ARTICLE_SELECTOR, ARTICLE_SELECTOR=> ARTICLE_SELECTOR.innerHTML);



  await page.waitFor(1000);

  await navigate(page, `${STAGE_URL}/${url}`)
  log.info(`Navigate to the URL ${STAGE_URL}/${url}`);

  let titleStage = await page.$eval(TITLE_SELECTOR, TITLE_SELECTOR => TITLE_SELECTOR.textContent);
  log.info(`Get title from URL ${STAGE_URL}/${url} - actual prod title ${titleStage}`);

  let bodyStage = await page.$eval(ARTICLE_SELECTOR, ARTICLE_SELECTOR=> ARTICLE_SELECTOR.innerHTML);
  
  try {

    expect(titleProd.trim()).toContain(titleStage.trim()); 

  } catch(err) {


    rewrite(url, "Failed");
    log.error(`Test End`);
    log.error(``);
  } 

  try {
    expect(bodyProd.trim()).toContain(bodyStage.trim());

    rewrite(url, "Passed");
    log.info(`Test End`);
    log.info(``);
  } catch(err) {
    
    rewrite(url, "Failed");

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
      fs.writeFile('result.json', "", function(err){
        if(err) console.log(`error ${err}`);
      })
      fs.appendFile('result.json', "[", function(err){
        if(err) console.log(`error ${err}`);
      })
      page = await global.__BROWSER__.newPage()
      await page.setViewport({width: 1920, height: 1080})
      jest.setTimeout(10000000);

    }, DEFAULT_TIMEOUT);

    afterAll(async () => {
      fs.appendFile('result.json', "{}]", function(err){
        if(err) console.log(`error ${err}`);
      })
    }, DEFAULT_TIMEOUT);

    test(`Test Script ${data[threads[0]].slug}`, async () => {
      while(threads[0]<threads[1]){
        threads[0]++;
          await validate(page, data[threads[0]].slug);
      }
    });

    test(`Test Script ${data[threads[1]].slug}`, async () => {
      while(threads[1]<threads[2]){
        threads[1]++;
          await validate(page, data[threads[1]].slug);
      }
    });

    test(`Test Script ${data[threads[2]].slug}`, async () => {
      while(threads[2]<threads[3]){
        threads[2]++;
          await validate(page, data[threads[2]].slug);
      }
    });

    test(`Test Script ${data[threads[3]].slug}`, async () => {
      while(threads[3]<threads[4]){
        threads[3]++;
          await validate(page, data[threads[3]].slug);
      }
    });

    test(`Test Script ${data[threads[4]].slug}`, async () => {
      while(threads[4]<threads[5]){
        threads[5]++;
          await validate(page, data[threads[5]].slug);
      }
    });

    test(`Test Script ${data[threads[6]].slug}`, async () => {
      while(threads[6]<threads[7]){
        threads[6]++;
          await validate(page, data[threads[6]].slug);
      }
    });

    test(`Test Script ${data[threads[7]].slug}`, async () => {
      while(threads[7]<threads[8]){
        threads[7]++;
          await validate(page, data[threads[7]].slug);
      }
    });

    test(`Test Script ${data[threads[8]].slug}`, async () => {
      while(threads[8]<threads[9]){
        threads[8]++;
          await validate(page, data[threads[8]].slug);
      }
    });

    test(`Test Script ${data[threads[9]].slug}`, async () => {
      while(threads[9]<threads[10]){
        threads[9]++;
          await validate(page, data[threads[9]].slug);
      }
    });

    test(`Test Script ${data[threads[10]].slug}`, async () => {
      while(threads[10]<threads[11]){
        threads[10]++;
          await validate(page, data[threads[10]].slug);
      }
    });

    test(`Test Script ${data[threads[11]].slug}`, async () => {
      while(threads[11]<threads[12]){
        threads[11]++;
          await validate(page, data[threads[11]].slug);
      }
    });

    test(`Test Script ${data[threads[12]].slug}`, async () => {
      while(threads[12]<threads[13]){
        threads[12]++;
          await validate(page, data[threads[12]].slug);
      }
    });

    test(`Test Script ${data[threads[13]].slug}`, async () => {
      while(threads[13]<threads[14]){
        threads[13]++;
          await validate(page, data[threads[13]].slug);
      }
    });

    test(`Test Script ${data[threads[14]].slug}`, async () => {
      while(threads[14]<threads[15]){
        threads[14]++;
          await validate(page, data[threads[14]].slug);
      }
    });

    test(`Test Script ${data[threads[15]].slug}`, async () => {
      while(threads[15]<threads[16]){
        threads[15]++;
          await validate(page, data[threads[15]].slug);
      }
    });

    test(`Test Script ${data[threads[16]].slug}`, async () => {
      while(threads[16]<threads[17]){
        threads[16]++;
          await validate(page, data[threads[16]].slug);
      }
    });

    test(`Test Script ${data[threads[17]].slug}`, async () => {
      while(threads[17]<threads[18]){
        threads[17]++;
          await validate(page, data[threads[17]].slug);
      }
    });

    test(`Test Script ${data[threads[18]].slug}`, async () => {
      while(threads[18]<threads[19]){
        threads[18]++;
          await validate(page, data[threads[18]].slug);
      }
    });

    test(`Test Script ${data[threads[19]].slug}`, async () => {
      while(threads[19]<threads[20]){
        threads[19]++;
          await validate(page, data[threads[19]].slug);
      }
    });

    test(`Test Script ${data[threads[20]].slug}`, async () => {
      while(threads[20]<threads[21]){
        threads[20]++;
          await validate(page, data[threads[20]].slug);
      }
    });

    test(`Test Script ${data[threads[21]].slug}`, async () => {
      while(threads[21]<threads[22]){
        threads[21]++;
          await validate(page, data[threads[21]].slug);
      }
    });

    test(`Test Script ${data[threads[22]].slug}`, async () => {
      while(threads[22]<threads[23]){
        threads[22]++;
          await validate(page, data[threads[22]].slug);
      }
    });

    test(`Test Script ${data[threads[23]].slug}`, async () => {
      while(threads[23]<threads[24]){
        threads[23]++;
          await validate(page, data[threads[23]].slug);
      }
    });

    test(`Test Script ${data[threads[24]].slug}`, async () => {
      while(threads[24]<threads[25]){
        threads[24]++;
          await validate(page, data[threads[24]].slug);
      }
    });

    test(`Test Script ${data[threads[25]].slug}`, async () => {
      while(threads[25]<threads[26]){
        threads[25]++;
          await validate(page, data[threads[25]].slug);
      }
    });

    test(`Test Script ${data[threads[26]].slug}`, async () => {
      while(threads[26]<threads[27]){
        threads[26]++;
          await validate(page, data[threads[26]].slug);
      }
    });

    test(`Test Script ${data[threads[27]].slug}`, async () => {
      while(threads[27]<threads[numberOfLinks]){
        threads[27]++;
          await validate(page, data[threads[27]].slug);
      }
    });

  },
  DEFAULT_TIMEOUT
)
