var init = require('./init')
var libs = require('../../credentials/target/target')

var cartDiscountsSource = require('../source/cartDiscounts')
var cartDiscountsTarget = require('./cartDiscounts')

const projectKey = libs.projectKey;

const service = init.createRequestBuilderTarget({
  projectKey
}).discountCodes

const createGetRequest = {
  uri: service.build(),
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}

async function createDiscountCodes(codes) {

  try {
    for (let code of codes.discounts) {
      await createDiscountCode(code);
    }

    console.log("Discount codes imported successfully");
  } catch (e) {
    console.log(e.message);
  }

}

exports.createDiscountCodes = createDiscountCodes;

async function createDiscountCode(discount) {
  const body = discount;

  try {

    if (body.cartDiscounts.length > 0) {
      for (let i = 0; i < body.cartDiscounts.length; i++) {
        let sortOrder = await cartDiscountsSource.getDiscountCodeById(body.cartDiscounts[i].id);
        let cartDiscountId = await cartDiscountsTarget.getDiscountCodeBySortOrder(sortOrder);
        body.cartDiscounts[i].id = cartDiscountId;
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
