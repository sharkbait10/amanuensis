var init = require('./init')
var libs = require('../../credentials/target/target')

const projectKey = libs.projectKey;

const service = init.createRequestBuilderTarget({
  projectKey
}).zones

async function createZones(zones) {

  try {
    for(let zone of zones.zones) {
      await createZone(zone);
    }

    console.log("Zones imported successfully");
  } catch (e) {
    console.log(e.message);
  } finally {

  }

}

exports.createZones = createZones;

async function createZone(zone) {
  const body = zone;

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
    let response = await init.clientTarget.execute(createPostRequest);
    return response;
  } catch (e) {
    console.log(e.message);
  }
}

async function getZoneIdByName(name) {
  const service = init.createRequestBuilderTarget({
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

  let response = await init.clientTarget.execute(createGetRequest);
  let zones = response.body.results;
  for(let i = 0; i<zones.length; i++) {
    if(zones[i].name === name) {
      return zones[i].id;
    }
  }
}

exports.getZoneIdByName = getZoneIdByName;
