const DEFAULT_TIMEOUT = 120000; // 2 Minutes
const SCREENSHOT_DIR = 'test/__tests__/screenshots';
const LOGS_DIR = 'test/__tests__/logs'
const log4js = require('log4js');
const data = require('../constanst/data.json');
const fs = require("fs");
const PROD_URL = 'http://oll.libertyfund.org/pages';
const STAGE_URL = 'https://jfcote87dev.wpengine.com/pages'
const Diff = require('text-diff');
const TITLE_SELECTOR = '#PageDiv > h1';
const ARTICLE_SELECTOR = 'section.pages';
let numberOfLinks = Object.keys(data).length;
let i = 0;
let threads = [
  0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, numberOfLinks
];
let files = [
  `./src/json/result1.json`,
  `./src/json/result2.json`,
  `./src/json/result3.json`,
  `./src/json/result4.json`,
  `./src/json/result5.json`,
  `./src/json/result6.json`,
  `./src/json/result7.json`,
  `./src/json/result8.json`,
  `./src/json/result9.json`,
  `./src/json/result10.json`,
  `./src/json/result11.json`,
  `./src/json/result12.json`,
  `./src/json/result13.json`,
  `./src/json/result14.json`,
  `./src/json/result15.json`,
  `./src/json/result16.json`,
  `./src/json/result17.json`,
  `./src/json/result18.json`,
  `./src/json/result19.json`,
  `./src/json/result20.json`,
  `./src/json/result21.json`,
  `./src/json/result22.json`,
  `./src/json/result23.json`,
  `./src/json/result24.json`,
  `./src/json/result25.json`,
  `./src/json/result26.json`,
  `./src/json/result27.json`,
  `./src/json/result28.json`,
];


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

async function write(file, obj){
   fs.writeFile(file, JSON.stringify(obj), function(err){
     if(err) console.log(`error ${err}`);
     console.log(`complete write ${file}`);
   })
}

function time(){
  return parseInt(new Date().getTime()/1000)
  }

  async function validate( page, url){
  let rObj;
  let prdl = `${PROD_URL}/${url}`;
  let stl =  `${STAGE_URL}/${url}`;
  var diff = new Diff();
  log4js.configure({
    appenders: { log: { type: 'file', filename: `${LOGS_DIR}/log-${url}.txt` } },
    categories: { default: { appenders: ['log'], level: 'trace' } }
  });
    
  const log = log4js.getLogger('log');

  log.info(``);
  log.info(`Test for ${url}`);
  log.info(`Start Test`);

  await page.waitFor(1000);
  await navigate(page, prdl)
  log.info(`Navigate to the URL ${prdl}`);

  let titleProd = await page.$eval(TITLE_SELECTOR, TITLE_SELECTOR => TITLE_SELECTOR.textContent);
  log.info(`Get title from URL${prdl} - actual prod title ${titleProd}`);

  let bodyProd = await page.$eval(ARTICLE_SELECTOR, ARTICLE_SELECTOR=> ARTICLE_SELECTOR.innerHTML);



  await page.waitFor(1000);

  await navigate(page, `${stl}`)
  log.info(`Navigate to the URL ${stl}`);

  let titleStage = await page.$eval(TITLE_SELECTOR, TITLE_SELECTOR => TITLE_SELECTOR.textContent);
  log.info(`Get title from URL ${stl} - actual prod title ${titleStage}`);

  let bodyStage = await page.$eval(ARTICLE_SELECTOR, ARTICLE_SELECTOR=> ARTICLE_SELECTOR.innerHTML);
  var tltdiff = diff.main(titleProd, titleStage);
  var bddiff = diff.main(bodyProd, bodyStage);
  try {

    expect(titleProd).toContain(titleStage); 

  } catch(err) {
    rObj = {
      link: url, 
      prodLink: prdl,
      stageLink: stl,
      status : "Failed",
      titleDifferent: diff.prettyHtml(tltdiff),
      bodyDiffernet: diff.prettyHtml(bddiff)
    }
    log.error(`Test End`);
    log.error(``);
    return rObj;
  } 

  try {
    expect(bodyProd).toContain(bodyStage);

    rObj = {
      link: url, 
      prodLink: prdl,
      stageLink: stl,
      status : "Passed",
      titleDifferent: "No Diff",
      bodyDiffernet: "No Diff"
    }

    log.info(`Test End`);
    log.info(``);
    return rObj;
  } catch(err) {
    
    rObj = {
      link: url, 
      prodLink: prdl,
      stageLink: stl,
      status : "Failed",
      titleDifferent: "No Diff",
      bodyDiffernet: diff.prettyHtml(bddiff)
    }

    log.error(`Value ${bodyProd} and ${bodyStage} `);
    log.error(`Test End`);
    log.error(``);
    return rObj;
  }
}

describe(
  '/ (Home Page)',
  () => {
    let page
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage()
      await page.setViewport({width: 1920, height: 1080})
      jest.setTimeout(10000000);

    }, DEFAULT_TIMEOUT);

    test(`Test Script ${data[threads[0]].slug}`, async () => {
      const jsonArray = []
      while(threads[0]<threads[1]){
        threads[0]++;
         const obj =  await validate(page, data[threads[0]].slug);
         jsonArray.push(obj);
      }
      await write(files[0], jsonArray);
    });

    test(`Test Script ${data[threads[1]].slug}`, async () => {
      const jsonArray = []
      while(threads[1]<threads[2]){
        threads[1]++;
        const obj = await validate(page, data[threads[1]].slug);
        jsonArray.push(obj);
      }
      await write(files[1], jsonArray);
    });

    test(`Test Script ${data[threads[2]].slug}`, async () => {
      const jsonArray = []
      while(threads[2]<threads[3]){
        threads[2]++;
        const obj = await validate(page, data[threads[2]].slug);
        jsonArray.push(obj);
      }
      await write(files[2], jsonArray);
    });

    test(`Test Script ${data[threads[3]].slug}`, async () => {
      const jsonArray = []
      while(threads[3]<threads[4]){
        threads[3]++;
        const obj = await validate(page, data[threads[3]].slug);
        jsonArray.push(obj);
      }
      await write(files[3], jsonArray);
    });


    test(`Test Script ${data[threads[4]].slug}`, async () => {
      const jsonArray = []
      while(threads[4]<threads[5]){
        threads[4]++;
        const obj = await validate(page, data[threads[4]].slug);
        jsonArray.push(obj);
      }
      await write(files[4], jsonArray);
    });


    test(`Test Script ${data[threads[5]].slug}`, async () => {
      const jsonArray = []
      while(threads[5]<threads[6]){
        threads[5]++;
        const obj = await validate(page, data[threads[5]].slug);
        jsonArray.push(obj);
      }
      await write(files[5], jsonArray);
    });


    test(`Test Script ${data[threads[6]].slug}`, async () => {
      const jsonArray = []
      while(threads[6]<threads[7]){
        threads[6]++;
        const obj = await validate(page, data[threads[6]].slug);
        jsonArray.push(obj);
      }
      await write(files[6], jsonArray);
    });

    test(`Test Script ${data[threads[7]].slug}`, async () => {
      const jsonArray = []
      while(threads[7]<threads[8]){
        threads[7]++;
        const obj = await validate(page, data[threads[7]].slug);
        jsonArray.push(obj);
      }
      await write(files[7], jsonArray);
    });

    test(`Test Script ${data[threads[8]].slug}`, async () => {
      const jsonArray = []
      while(threads[8]<threads[9]){
        threads[8]++;
        const obj = await validate(page, data[threads[8]].slug);
        jsonArray.push(obj);
      }
      await write(files[8], jsonArray);
    });

    test(`Test Script ${data[threads[9]].slug}`, async () => {
      const jsonArray = []
      while(threads[9]<threads[10]){
        threads[9]++;
        const obj = await validate(page, data[threads[9]].slug);
        jsonArray.push(obj);
      }
      await write(files[9], jsonArray);
    });

    test(`Test Script ${data[threads[10]].slug}`, async () => {
      const jsonArray = []
      while(threads[10]<threads[11]){
        threads[10]++;
        const obj = await validate(page, data[threads[10]].slug);
        jsonArray.push(obj);
      }
      await write(files[10], jsonArray);
    });

    test(`Test Script ${data[threads[11]].slug}`, async () => {
      const jsonArray = []
      while(threads[11]<threads[12]){
        threads[11]++;
        const obj = await validate(page, data[threads[11]].slug);
        jsonArray.push(obj);
      }
      await write(files[11], jsonArray);
    });

    test(`Test Script ${data[threads[12]].slug}`, async () => {
      const jsonArray = []
      while(threads[12]<threads[13]){
        threads[12]++;
        const obj = await validate(page, data[threads[12]].slug);
        jsonArray.push(obj);
      }
      await write(files[12], jsonArray);
    });

    test(`Test Script ${data[threads[13]].slug}`, async () => {
      const jsonArray = []
      while(threads[13]<threads[14]){
        threads[13]++;
        const obj = await validate(page, data[threads[13]].slug);
        jsonArray.push(obj);
      }
      await write(files[13], jsonArray);
    });

    test(`Test Script ${data[threads[14]].slug}`, async () => {
      const jsonArray = []
      while(threads[14]<threads[15]){
        threads[14]++;
        const obj = await validate(page, data[threads[14]].slug);
        jsonArray.push(obj);
      }
      await write(files[14], jsonArray);
    });

    test(`Test Script ${data[threads[15]].slug}`, async () => {
      const jsonArray = []
      while(threads[15]<threads[16]){
        threads[15]++;
        const obj = await validate(page, data[threads[15]].slug);
        jsonArray.push(obj);
      }
      await write(files[15], jsonArray);
    });

    test(`Test Script ${data[threads[16]].slug}`, async () => {
      const jsonArray = []
      while(threads[16]<threads[17]){
        threads[16]++;
        const obj = await validate(page, data[threads[16]].slug);
        jsonArray.push(obj);
      }
      await write(files[16], jsonArray);
    });

    test(`Test Script ${data[threads[17]].slug}`, async () => {
      const jsonArray = []
      while(threads[17]<threads[18]){
        threads[17]++;
        const obj = await validate(page, data[threads[17]].slug);
        jsonArray.push(obj);
      }
      await write(files[17], jsonArray);
    });

    test(`Test Script ${data[threads[18]].slug}`, async () => {
      const jsonArray = []
      while(threads[18]<threads[19]){
        threads[18]++;
        const obj = await validate(page, data[threads[18]].slug);
        jsonArray.push(obj);
      }
      await write(files[18], jsonArray);
    });

    test(`Test Script ${data[threads[19]].slug}`, async () => {
      const jsonArray = []
      while(threads[19]<threads[20]){
        threads[19]++;
        const obj = await validate(page, data[threads[19]].slug);
        jsonArray.push(obj);
      }
      await write(files[19], jsonArray);
    });

    test(`Test Script ${data[threads[20]].slug}`, async () => {
      const jsonArray = []
      while(threads[20]<threads[21]){
        threads[20]++;
        const obj = await validate(page, data[threads[20]].slug);
        jsonArray.push(obj);
      }
      await write(files[20], jsonArray);
    });

    test(`Test Script ${data[threads[21]].slug}`, async () => {
      const jsonArray = []
      while(threads[21]<threads[22]){
        threads[21]++;
        const obj = await validate(page, data[threads[21]].slug);
        jsonArray.push(obj);
      }
      await write(files[21], jsonArray);
    });

    test(`Test Script ${data[threads[22]].slug}`, async () => {
      const jsonArray = []
      while(threads[22]<threads[23]){
        threads[22]++;
        const obj = await validate(page, data[threads[22]].slug);
        jsonArray.push(obj);
      }
      await write(files[22], jsonArray);
    });

    test(`Test Script ${data[threads[23]].slug}`, async () => {
      const jsonArray = []
      while(threads[23]<threads[24]){
        threads[23]++;
        const obj = await validate(page, data[threads[23]].slug);
        jsonArray.push(obj);
      }
      await write(files[23], jsonArray);
    });

    test(`Test Script ${data[threads[24]].slug}`, async () => {
      const jsonArray = []
      while(threads[24]<threads[25]){
        threads[24]++;
        const obj = await validate(page, data[threads[24]].slug);
        jsonArray.push(obj);
      }
      await write(files[24], jsonArray);
    });

    test(`Test Script ${data[threads[25]].slug}`, async () => {
      const jsonArray = []
      while(threads[25]<threads[26]){
        threads[25]++;
        const obj = await validate(page, data[threads[25]].slug);
        jsonArray.push(obj);
      }
      await write(files[25], jsonArray);
    });

    test(`Test Script ${data[threads[26]].slug}`, async () => {
      const jsonArray = []
      while(threads[26]<threads[27]){
        threads[26]++;
        const obj = await validate(page, data[threads[26]].slug);
        jsonArray.push(obj);
      }
      await write(files[26], jsonArray);
    });

    test(`Test Script ${data[threads[27]].slug}`, async () => {
      const jsonArray = []
      while(threads[27]<threads[28]){
        threads[27]++;
        const obj = await validate(page, data[threads[27]].slug);
        jsonArray.push(obj);
      }
      await write(files[27], jsonArray);
    });

  },
  DEFAULT_TIMEOUT
)