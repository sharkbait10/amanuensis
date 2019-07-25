var init = require('./init')
var libs = require('../../credentials/source/source')

var fs = require('fs');

const projectKey = libs.projectKey;

const service = init.createRequestBuilderSource({
  projectKey
}).project

const createGetRequest = {
  uri: service.build(),
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}

async function getProjectAsync() {
  try {
    let response = await init.clientSource.execute(createGetRequest);
    return response;
  } catch (e) {
    console.log(e.message);
  }
}

exports.getProjectAsync = getProjectAsync;

async function getSourceCurrencies() {
  try {
    let project = await getProjectAsync();
    let currencies = project.body.currencies;
    console.log(currencies);
    let json = {
      currencies: JSON.stringify(currencies)
    }

    fs.writeFile('./exports/currencies.json', JSON.stringify(json), 'utf8', function(err) {
      if (err) throw err;
      console.log('complete');
    });
  } catch (e) {
    console.log(e.message);
  }
}

exports.getSourceCurrencies = getSourceCurrencies;
