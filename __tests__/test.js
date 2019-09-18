const DEFAULT_TIMEOUT = 120000; // 2 Minutes
const SCREENSHOT_DIR = '__tests__/screenshots';
const LOGS_DIR = '__tests__/logs'
const log4js = require('log4js');
const data = require('../constanst/data.json');
const fs = require("fs");
const PROD_URL = 'http://oll.libertyfund.org/pages';
const STAGE_URL = 'https://jfcote87dev.wpengine.com/pages'
const result = require('../result.json');

const TITLE_SELECTOR = '#PageDiv > h1';
const ARTICLE_SELECTOR = 'section.pages';

let i = 0;
let firstThread = 0;
let secondThread = 150;
let thirdThread = 300
let fourtThread = 450;
let fiveThread = 600;
let sixThread = 750;
let sevenThread = 900;
let eightThread = 1100;
let numberOfLinks = Object.keys(data).length;


function rewrite(){
  let tests = [];
   for(i=0;i<numberOfLinks;i++){
     var obj = {
          link    : data[i].slug, 
          status : ""
        }
        tests.push(obj);
     }
    
     fs.writeFile('result.json', JSON.stringify(tests), function(err){
     if(err) throw err;
     console.log(`complete`);
   })
}

function time(){
  return parseInt(new Date().getTime()/1000)
  }


function find(value){
  let a = 0
  for(a=0; a < numberOfLinks; a++){
    if(result[a].link === value){
      return a;
    }
  }
}
async function validate( page, url){

  log4js.configure({
    appenders: { log: { type: 'file', filename: `${LOGS_DIR}/log-${url}.txt` } },
    categories: { default: { appenders: ['log'], level: 'trace' } }
  });
    
  const log = log4js.getLogger('log');

  var searchedLink = find(url);

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

  let bodyProd = await page.$eval(ARTICLE_SELECTOR, ARTICLE_SELECTOR=> ARTICLE_SELECTOR.innerHTML);

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

  let bodyStage = await page.$eval(ARTICLE_SELECTOR, ARTICLE_SELECTOR=> ARTICLE_SELECTOR.innerHTML);

  await page.screenshot({
    path: `${SCREENSHOT_DIR}/${time()}-${url}-stage.png`,
    type: 'png',
    fullPage: 'true'});
  
  try {

    expect(titleProd.trim()).toContain(titleStage.trim()); 

  } catch(err) {


    result[searchedLink].status = "Failed";
    log.error(`Test End`);
    log.error(``);
  } 

  try {
    expect(bodyProd.trim()).toContain(bodyStage.trim());

    result[searchedLink].status = "Passed";
    
    log.info(`Test End`);
    log.info(``);
  } catch(err) {
    
    result[searchedLink].status = "Failed";

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
      rewrite();
      page = await global.__BROWSER__.newPage()
      await page.setViewport({width: 1920, height: 1080})
      jest.setTimeout(10000000);

    }, DEFAULT_TIMEOUT)


    test(`Test Script ${data[firstThread].slug}`, async () => {
      while(firstThread<secondThread){
          firstThread++;
          await validate(page, data[firstThread].slug);
      }
    });

    test(`Test Script ${data[secondThread].slug}`, async () => {
      while(secondThread<thirdThread){
          secondThread++;
          await validate(page, data[secondThread].slug);
      }
    });

    test(`Test Script ${data[thirdThread].slug}`, async () => {
      while(thirdThread<fourtThread){
          thirdThread++;
          await validate(page, data[thirdThread].slug);
      }
    });

    test(`Test Script ${data[fourtThread].slug}`, async () => {
      while(fourtThread<fiveThread){
          fourtThread++;
          await validate(page, data[fourtThread].slug);
      }
    });

    test(`Test Script ${data[fiveThread].slug}`, async () => {
      while(fiveThread<sixThread){
          fiveThread++;
          await validate(page, data[fiveThread].slug);
      }
    });

    
    test(`Test Script ${data[sixThread].slug}`, async () => {
      while(sixThread<sevenThread){
          sixThread++;
          await validate(page, data[sixThread].slug);
      }
    });

    
    test(`Test Script ${data[sevenThread].slug}`, async () => {
      while(sevenThread<eightThread){
          sevenThread++;
          await validate(page, data[sevenThread].slug);
      }
    });

    test(`Test Script ${data[eightThread].slug}`, async () => {
      while(eightThread<numberOfLinks){
          eightThread++;
          await validate(page, data[eightThread].slug);
      }
    });
  },
  DEFAULT_TIMEOUT
)
