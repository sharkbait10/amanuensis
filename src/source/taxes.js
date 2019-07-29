var init = require('./init')
var libs = require('../../credentials/source/source')

const projectKey = libs.projectKey;

const service = init.createRequestBuilderSource({
  projectKey
}).taxCategories

const createGetRequest = {
  uri: service.build(),
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}

async function getTaxCategories() {
  try {
    let getTaxCategoriesResponse = await init.clientSource.execute(createGetRequest);
    let taxCategories = getTaxCategoriesResponse.body.results;
    let filteredTaxCategories = {};
    let key = 'taxCategories';
    filteredTaxCategories[key] = [];
    taxCategories.forEach(element => {
      let taxCategory = {
        name: element.name,
        description: element.description,
        rates: element.rates,
        key: element.key
      };
      filteredTaxCategories[key].push(taxCategory);
    });
    return filteredTaxCategories;
  } catch (e) {
    console.log(e.message);
  }
}

exports.getTaxCategories = getTaxCategories;



async function getTaxCategoryById(id) {
  try {
    const serviceById = init.createRequestBuilderSource({
      projectKey
    }).taxCategories.byId(id)

    const createGetRequestById = {
      uri: serviceById.build(),
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }

    let response = await init.clientSource.execute(createGetRequestById);
    return response.body.name;
  } catch (e) {
    console.log(e.message);
  }
}

exports.getTaxCategoryById = getTaxCategoryById;
