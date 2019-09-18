var init = require('./init')
var libs = require('../../credentials/source/source')

const projectKey = libs.projectKey;

const service = init.createRequestBuilderSource({
  projectKey
}).productDiscounts

const createGetRequest = {
  uri: service.build(),
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}

async function getAllProductDiscounts() {
  try {
    let response = await init.clientSource.execute(createGetRequest);
    let discounts = response.body.results;
    let filteredDiscounts = {};
    let key = 'discounts';
    filteredDiscounts[key] = [];
    discounts.forEach(element => {
      let discount = {
        name: element.name,
        value: element.value,
        predicate: element.predicate,
        description: element.description,
        isActive: element.isActive,
        sortOrder: element.sortOrder,
        references: element.references,
        attributeTypes: element.attributeTypes,
        createdAt: element.createdAt
      };
      filteredDiscounts[key].push(discount);
    });
    return filteredDiscounts;
  } catch (e) {
    console.log(e.message);
  }
}

exports.getAllProductDiscounts = getAllProductDiscounts;
