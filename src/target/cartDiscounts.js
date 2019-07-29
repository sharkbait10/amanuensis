var init = require('./init')
var libs = require('../../credentials/target/target')

const projectKey = libs.projectKey;

const service = init.createRequestBuilderTarget({
  projectKey
}).cartDiscounts

async function createDiscounts(discounts) {

  try {
    for (let discount of discounts.discounts) {
      await createDiscount(discount);
    }

    console.log("Cart discounts imported successfully");
  } catch (e) {
    console.log(e.message);
  }

}

exports.createDiscounts = createDiscounts;

async function createDiscount(discount) {
  const body = discount;

  try {

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

async function getDiscountCodeBySortOrder(sortOrder) {

  const createGetRequest = {
    uri: service.build(),
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }

  try {
    let response = await init.clientTarget.execute(createGetRequest);
    for (let discount of response.body.results) {
      if(discount.sortOrder === sortOrder) {
        return discount.id;
      }
    }
  } catch (e) {
    console.log(e.message);
  }
}

exports.getDiscountCodeBySortOrder = getDiscountCodeBySortOrder;
