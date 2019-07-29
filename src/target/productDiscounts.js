var init = require('./init')
var libs = require('../../credentials/target/target')

var categoriesSource = require('../source/categories')
var categoriesTarget = require('./categories')

const projectKey = libs.projectKey;

const service = init.createRequestBuilderTarget({
  projectKey
}).productDiscounts

async function createDiscounts(discounts) {

  try {
    for (let discount of discounts.discounts) {
      await createDiscount(discount);
    }

    console.log("Product discounts imported successfully");
  } catch (e) {
    console.log(e.message);
  }

}

exports.createDiscounts = createDiscounts;

async function createDiscount(discount) {
  const body = discount;

  try {

    if (body.predicate.includes('categories')) {
      // categories.id = (\"49fe46ef-eff1-4486-8a0d-f41184ef893d\")
      let categoryId = body.predicate.substring(body.predicate.lastIndexOf('(\"') + 2, body.predicate.lastIndexOf('\")'));
      let key = await categoriesSource.getCategoryById(categoryId);
      categoryId = await categoriesTarget.getCategoryIdByKey(key);
      body.predicate = 'categories.id = (\"' + categoryId + '\")'
    }

    if (body.references.length > 0) {
      for (let i = 0; i < body.references.length; i++) {
        let key = await categoriesSource.getCategoryById(body.references[i].id);
        let categoryId = await categoriesTarget.getCategoryIdByKey(key);
        body.references[i].id = categoryId;
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
