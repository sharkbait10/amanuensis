var init = require('./init')
var libs = require('../../credentials/source/source')

const projectKey = libs.projectKey;

const service = init.createRequestBuilderSource({
  projectKey
}).channels

const createGetRequest = {
  uri: service.build(),
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}

async function getSourceChannels() {
  try {
    let getChannelsResponse = await init.clientSource.execute(createGetRequest);
    let channels = getChannelsResponse.body.results;
    let filteredChannels = {};
    let key = 'channels';
    filteredChannels[key] = [];
    channels.forEach(element => {
      let channel = {
        name: element.name,
        key: element.key,
        roles: element.roles
      };
      filteredChannels[key].push(channel);
    });
    return filteredChannels;
  } catch (e) {
    console.log(e.message);
  }
}

exports.getSourceChannels = getSourceChannels;
