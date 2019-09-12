var init = require('../init')
var libs = require('../../../credentials/target/target')
const orderGrandvision = require("./order-grandvision.json");
const paymentsGrandvision = require("./payments-grandvision.json");
const contactLens = require("./contact-lens.json");

const projectKey = libs.projectKey;

const service = init.createRequestBuilderTarget({
  projectKey
}).types

async function createOrderGrandvisionProductType() {
    try {

        const createPostRequest = {
          uri: service.build(),
          method: 'POST',
          body: orderGrandvision,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          json: true
        }

        await init.clientTarget.execute(createPostRequest);
      } catch (e) {
        console.log(e.message);
      }
}

async function createContactLensesProductType() {
    try {

        const createPostRequest = {
          uri: service.build(),
          method: 'POST',
          body: contactLens,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          json: true
        }

        await init.clientTarget.execute(createPostRequest);
      } catch (e) {
        console.log(e.message);
      }
}

async function createPaymentsGrandvisionProductType() {
    try {

        const createPostRequest = {
          uri: service.build(),
          method: 'POST',
          body: paymentsGrandvision,
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

async function createTypes() {
    await createContactLensesProductType();
    await createOrderGrandvisionProductType();
    await createPaymentsGrandvisionProductType();
    console.log("Types created successfully");
}

exports.createTypes = createTypes;