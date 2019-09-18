var init = require('./init')
var libs = require('../../credentials/source/source')

const projectKey = libs.projectKey;

const service = init.createRequestBuilderSource({
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

async function getAllDiscountCodes() {
  try {
    let response = await init.clientSource.execute(createGetRequest);
    let discounts = response.body.results;
    let filteredDiscounts = {};
    let key = 'discounts';
    filteredDiscounts[key] = [];
    discounts.forEach(element => {
      let discount = {
        code: element.code,
        name: element.name,
        description: element.description,
        cartDiscounts: element.cartDiscounts,
        isActive: element.isActive,
        references: element.references,
        attributeTypes: element.attributeTypes,
        cartFieldTypes: element.cartFieldTypes,
        lineItemFieldTypes: element.lineItemFieldTypes,
        customLineItemFieldTypes: element.customLineItemFieldTypes,
        groups: element.groups,
        maxApplications: element.maxApplications,
        maxApplicationsPerCustomer: element.maxApplicationsPerCustomer
      };
      filteredDiscounts[key].push(discount);
    });
    return filteredDiscounts;
  } catch (e) {
    console.log(e.message);
  }
}

exports.getAllDiscountCodes = getAllDiscountCodes;

async function getDiscountCodeById(id) {
  try {
    const serviceById = init.createRequestBuilderSource({
      projectKey
    }).discountCodes.byId(id)

    const createGetRequestById = {
      uri: serviceById.build(),
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }

    let response = await init.clientSource.execute(createGetRequestById);
    return response.body.code;
  } catch (e) {
    console.log(e.message);
  }
}

exports.getDiscountCodeById = getDiscountCodeById;
