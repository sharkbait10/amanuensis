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
    await source.projectInfo.getSourceCurrencies();
  } catch (e) {
    console.log(e.message);
  }
}
