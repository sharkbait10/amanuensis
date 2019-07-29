var init = require('./init')
var libs = require('../../credentials/source/source')

var taxSource = require('./taxes')
var taxTarget = require('../target/taxes')

var zonesSource = require('./zones')
var zonesTarget = require('../target/zones')

const projectKey = libs.projectKey;

const service = init.createRequestBuilderSource({
  projectKey
}).shippingMethods

const createGetRequest = {
  uri: service.build(),
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}



async function getShippingMethods() {
  try {
    let getShippingMethodsResponse = await init.clientSource.execute(createGetRequest);
    let shippingMethods = getShippingMethodsResponse.body.results;
    let filteredShippingMethods = {};
    let key = 'shippingMethods';
    filteredShippingMethods[key] = [];

    for (let i = 0; i < shippingMethods.length; i++) {
      let taxName = await taxSource.getTaxCategoryById(shippingMethods[i].taxCategory.id);
      let taxId = await taxTarget.getTaxCategoryByName(taxName);

      let shippingMethod = {
        name: shippingMethods[i].name,
        description: shippingMethods[i].description,
        taxCategory: shippingMethods[i].taxCategory,
        zoneRates: shippingMethods[i].zoneRates,
        isDefault: shippingMethods[i].isDefault,
        key: shippingMethods[i].key
      };
      shippingMethod.taxCategory.id = taxId;


      for (let j = 0; j < shippingMethod.zoneRates.length; j++) {
        let smName = await zonesSource.getZoneById(shippingMethod.zoneRates[j].zone.id);
        let smId = await zonesTarget.getZoneIdByName(smName)

        shippingMethod.zoneRates[j].zone.id = smId;
      }

      filteredShippingMethods[key].push(shippingMethod);
    }

    return filteredShippingMethods;
  } catch (e) {
    console.log(e.message);
  }
}

exports.getShippingMethods = getShippingMethods;
