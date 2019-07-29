var init = require('./init')
var libs = require('../../credentials/source/source')

const projectKey = libs.projectKey;

const service = init.createRequestBuilderSource({
  projectKey
}).categories

const createGetRequest = {
  uri: service.build(),
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}

async function getAllCategories() {
  try {
    let response = await init.clientSource.execute(createGetRequest);
    let categories = response.body.results;
    let filteredcategories = {};
    let key = 'categories';
    filteredcategories[key] = [];
    categories.forEach(element => {
      let category = {
        name: element.name,
        key: element.key,
        slug: element.slug,
        description: element.description,
        ancestors: element.ancestors,
        orderHint: element.orderHint,
        externalId: element.externalId,
        assets: element.assets,
        parent: element.parent,
        metaTitle: element.metaTitle,
        metaDescription: element.metaDescription
      };
      filteredcategories[key].push(category);
    });
    return filteredcategories;
  } catch (e) {

  }
}

exports.getAllCategories = getAllCategories;



async function getCategoryById(id) {

  const serviceById = init.createRequestBuilderSource({
    projectKey
  }).categories.byId(id)

  try {
    const createGetRequestById = {
      uri: serviceById.build(),
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }

    let response = await init.clientSource.execute(createGetRequestById);
    return response.body.key;
  } catch (e) {
    console.log(e.message);
  }
}

exports.getCategoryById = getCategoryById;
