var init = require('./init')
var libs = require('../../credentials/target/target')

var categoriesSource = require('../source/categories')

const projectKey = libs.projectKey;

const service = init.createRequestBuilderTarget({
  projectKey
}).categories

async function createCategories(categories) {

  try {
    for (let category of categories.categories) {
      await createCategory(category);
    }

    console.log("Categories imported successfully");
  } catch (e) {
    console.log(e.message);
  } finally {

  }

}

exports.createCategories = createCategories;

async function createCategory(category) {
  const body = category;

  try {

    if (body.parent !== undefined) {
      let key = await categoriesSource.getCategoryById(body.parent.id);
      let categoryId = await getCategoryIdByKey(key);
      body.parent.id = categoryId;
    }

    if (body.ancestors.length > 0) {
      for (let i=0; i<body.ancestors.length; i++) {
        let key = await categoriesSource.getCategoryById(body.ancestors[i].id);
        let categoryId = await getCategoryIdByKey(key);
        body.ancestors[i].id = categoryId;
      }
    }

    const createPostRequest = {
      uri: service.build(),
      method: 'POST',
      body: body,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }

    await init.clientTarget.execute(createPostRequest);
  } catch (e) {
    console.log(e.message);
  }
}




async function getCategoryIdByKey(key) {
  try {

    const serviceByKey = init.createRequestBuilderTarget({
      projectKey
    }).categories.byKey(key)

    const createGetRequest = {
      uri: serviceByKey.build(),
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }

    let response = await init.clientTarget.execute(createGetRequest);
    return response.body.id;

  } catch (e) {
    console.log(e.message);
  }
}

exports.getCategoryIdByKey = getCategoryIdByKey;
