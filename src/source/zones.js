var init = require('./init')
var libs = require('../../credentials/source/source')

const projectKey = libs.projectKey;

const service = init.createRequestBuilderSource({
  projectKey
}).zones

const createGetRequest = {
  uri: service.build(),
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}

async function getZones() {
  try {
    let getZonesResponse = await init.clientSource.execute(createGetRequest);
    let zones = getZonesResponse.body.results;
    let filteredZones = {};
    let key = 'zones';
    filteredZones[key] = [];
    zones.forEach(element => {
      let zone = {
        name: element.name,
        description: element.description,
        locations: element.locations
      };
      filteredZones[key].push(zone);
    });
    return filteredZones;
  } catch (e) {
    console.log(e.message);
  }
}

exports.getZones = getZones;

async function getZoneById(id) {
  const serviceById = init.createRequestBuilderSource({
    projectKey
  }).zones.byId(id)

  const createGetRequestById = {
    uri: serviceById.build(),
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }

  let response = await init.clientSource.execute(createGetRequestById);
  return response.body.name;
}

exports.getZoneById = getZoneById;
