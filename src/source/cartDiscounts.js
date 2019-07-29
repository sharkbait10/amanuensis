var init = require('./init')
var libs = require('../../credentials/source/source')

const projectKey = libs.projectKey;

const service = init.createRequestBuilderSource({
  projectKey
}).cartDiscounts

const createGetRequest = {
  uri: service.build(),
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}

async function getAllCartDiscounts() {
  try {
    let response = await init.clientSource.execute(createGetRequest);
    let discounts = response.body.results;
    let filteredDiscounts = {};
    let key = 'discounts';
    filteredDiscounts[key] = [];
    discounts.forEach(element => {
      let discount = {
        name: element.name,
        value: element.value,
        cartPredicate: element.cartPredicate,
        target: element.target,
        description: element.description,
        stackingMode: element.stackingMode,
        isActive: element.isActive,
        requiresDiscountCode: element.requiresDiscountCode,
        sortOrder: element.sortOrder,
        references: element.references,
        attributeTypes: element.attributeTypes,
        cartFieldTypes: element.cartFieldTypes,
        lineItemFieldTypes: element.lineItemFieldTypes,
        customLineItemFieldTypes: element.customLineItemFieldTypes
      };
      filteredDiscounts[key].push(discount);
    });
    return filteredDiscounts;
  } catch (e) {
    console.log(e.message);
  }
}

exports.getAllCartDiscounts = getAllCartDiscounts;

async function getDiscountCodeById(id) {
  let response = await init.clientSource.execute(createGetRequest);
  for(let discount of response.body.results) {
    if(discount.id === id) {
      return discount.sortOrder;
    }
  }
}

exports.getDiscountCodeById = getDiscountCodeById;
