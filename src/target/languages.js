var init = require('./init')
var libs = require('../../credentials/target/target')

const projectKey = libs.projectKey;

const service = init.createRequestBuilderTarget({
  projectKey
}).project

async function createLanguagesAsync(version, languages) {

  const body = {
      version: version,
      actions: [{
          action: 'changeLanguages',
          languages: languages
      }]
  }
  // console.log(JSON.stringify(body, undefined, 2));
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
    console.log("Languages imported successfully");
    return response.body.version;
  } catch (e) {
    console.log(e.message);
  }
}

exports.createLanguagesAsync = createLanguagesAsync;
