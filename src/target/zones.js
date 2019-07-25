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
