var init = require('../init')
var libs = require('../../../credentials/target/target')
const orderNumber = require("./order-number.json");

const projectKey = libs.projectKey;

const service = init.createRequestBuilderTarget({
  projectKey
}).customObjects

async function createCustomObjects() {
    try {

        const createPostRequest = {
          uri: service.build(),
          method: 'POST',
          body: orderNumber,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }

        await init.clientTarget.execute(createPostRequest);
        console.log("Custom objects created successfully");
        
      } catch (e) {
        console.log(e.message);
      }
}

exports.createCustomObjects = createCustomObjects;