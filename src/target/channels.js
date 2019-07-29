var init = require('./init')
var libs = require('../../credentials/target/target')

const projectKey = libs.projectKey;

const service = init.createRequestBuilderTarget({
  projectKey
}).channels

async function createChannels(channels) {

  try {
    for(let channel of channels.channels) {
      await createChannel(channel);
    }

    console.log("Channels imported successfully");
  } catch (e) {
    console.log(e.message);
  } finally {

  }

}

exports.createChannels = createChannels;

async function createChannel(channel) {
  const body = channel;

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
    await init.clientTarget.execute(createPostRequest);
  } catch (e) {
    console.log(e.message);
  }
}
