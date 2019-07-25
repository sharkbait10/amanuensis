var init = require('./init')
var libs = require('../../credentials/target/target')

const projectKey = libs.projectKey;

const service = init.createRequestBuilderTarget({
  projectKey
}).project

const createGetRequest = {
  uri: service.build(),
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}

async function getProjectAsync() {
  try {
    let response = await init.clientTarget.execute(createGetRequest);
    return response;
  } catch (e) {
    console.log(e.message);
  }
}

exports.getProjectAsync = getProjectAsync;
