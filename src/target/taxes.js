var init = require('./init')
var libs = require('../../credentials/target/target')

const projectKey = libs.projectKey;

const service = init.createRequestBuilderTarget({
  projectKey
}).taxCategories

async function createTaxCategories(taxCategories) {

  try {
    for(let tax of taxCategories.taxCategories) {
      await createTaxCategory(tax);
    }

    console.log("Tax categories imported successfully");
  } catch (e) {
    console.log(e.message);
  } finally {

  }

}

exports.createTaxCategories = createTaxCategories;

async function createTaxCategory(tax) {
  const body = tax;

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
    let response = await init.clientTarget.execute(createPostRequest);
    return response;
  } catch (e) {
    console.log(e.message);
  }
}
