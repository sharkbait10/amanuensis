var init = require('./init')
var libs = require('../../credentials/source/source')

const projectKey = libs.projectKey;

const service = init.createRequestBuilderSource({
  projectKey
}).productTypes

const createGetRequest = {
  uri: service.build(),
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}

async function getProductTypes() {
  try {
    let response = await init.clientSource.execute(createGetRequest);
    let productTypes = response.body.results;
    let filteredTypes = {};
    let key = 'productTypes';
    filteredTypes[key] = [];
    productTypes.forEach(element => {
      let type = {
        name: element.name,
        description: element.description,
        classifier: element.classifier,
        attributes: element.attributes
      };
      filteredTypes[key].push(type);
    });
    return filteredTypes;
  } catch (e) {
    console.log(e.message);
  }
}

exports.getProductTypes = getProductTypes;
