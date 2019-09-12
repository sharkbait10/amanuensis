var init = require('../init')
var libs = require('../../../credentials/target/target')
const newOrder = require("./newOrder.json");
const productChange = require("./productChange.json");
const productDiscountChange = require("./productDiscountChange.json");

const projectKey = libs.projectKey;

const service = init.createRequestBuilderTarget({
  projectKey
}).subscriptions

async function createNewOrderSubscription() {
    try {

        const createPostRequest = {
          uri: service.build(),
          method: 'POST',
          body: newOrder,
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

async function createProductChangeSubscription() {
    try {

        const createPostRequest = {
          uri: service.build(),
          method: 'POST',
          body: productChange,
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

async function createProductDiscountChangeSubscription() {
    try {

        const createPostRequest = {
          uri: service.build(),
          method: 'POST',
          body: productDiscountChange,
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

async function createSubscriptions() {
    await createNewOrderSubscription();
    await createProductChangeSubscription();
    await createProductDiscountChangeSubscription();
    console.log("Subscriptions created successfully");
}

exports.createSubscriptions = createSubscriptions;