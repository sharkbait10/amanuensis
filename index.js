var source = require('require-all')(__dirname + '/src/source');
var target = require('require-all')(__dirname + '/src/target');

app();

async function app() {
  try {
    console.log('--- Source ---');
    let sourceProject = await source.projectInfo.getProjectAsync();
    console.log(sourceProject);
    console.log('--- Target ---');
    let targetProject = await target.projectInfo.getProjectAsync();
    console.log(targetProject);
    let targetProjectVersion = targetProject.body.version;
    await source.projectInfo.getSourceCurrencies();
    await target.currencies.createCurrenciesAsync(targetProjectVersion);
  } catch (e) {
    console.log(e.message);
  }
}
