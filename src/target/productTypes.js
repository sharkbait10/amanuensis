var init = require('./init')
var libs = require('../../credentials/target/target')

const projectKey = libs.projectKey;

const service = init.createRequestBuilderTarget({
  projectKey
}).productTypes

async function createProductTypes(types) {

  try {
    for(let type of types.productTypes) {
      await createProductType(type);
    }

    console.log("Product types imported successfully");
  } catch (e) {
    console.log(e.message);
  }

}

exports.createProductTypes = createProductTypes;

async function createProductType(type) {
  const body = type;

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
  } catch (e) {
    console.log(e.message);
  }
}
