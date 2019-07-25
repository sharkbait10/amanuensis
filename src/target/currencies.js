var init = require('./init')
var libs = require('../../credentials/target/target')

const fs = require('fs');

const projectKey = libs.projectKey;

const service = init.createRequestBuilderTarget({
  projectKey
}).project

async function createCurrenciesAsync(version) {

  let currencies = await readCurrenciesFile();

  const body = {
      version: version,
      actions: [{
          action: 'changeCurrencies',
          currencies: currencies
      }]
  }
  // console.log(JSON.stringify(body, undefined, 2));
  const createPostRequest = {
      uri: service.build(),
      method: 'POST',
      body: body,
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
  }

  try {
    await init.clientTarget.execute(createPostRequest);
    console.log("Currencies imported successfully");
  } catch (e) {
    console.log(e.message);
  }
}

exports.createCurrenciesAsync = createCurrenciesAsync;

async function readCurrenciesFile() {
  let rawdata = await fs.readFileSync('./exports/currencies.json');
  let currencies = JSON.parse(rawdata);
  return currencies;
}
