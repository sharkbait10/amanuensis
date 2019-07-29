var init = require('./init')
var libs = require('../../credentials/target/target')

const projectKey = libs.projectKey;

const service = init.createRequestBuilderTarget({
  projectKey
}).shippingMethods

async function createShippingMethods(shippingMethods) {
  try {
    for (let shippingMethod of shippingMethods.shippingMethods) {
      await createShippingMethod(shippingMethod);
    }
    console.log("Shipping methods created successfully");
  } catch (e) {
    console.log(e.message);
  }
}

exports.createShippingMethods = createShippingMethods;

async function createShippingMethod(shippingMethod) {
  const body = shippingMethod;

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
