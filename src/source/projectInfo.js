var init = require('./init')
var libs = require('../../credentials/source/source')

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

async function getSourceProjectSettings() {
  try {
    let project = await getProjectAsync();
    let currencies = project.body.currencies;
    let languages = project.body.languages;
    let countries = project.body.countries;

    return {currencies, languages, countries};
  } catch (e) {
    console.log(e.message);
  }
}

exports.getSourceProjectSettings = getSourceProjectSettings;
