var source = require('require-all')(__dirname + '/src/source');
var target = require('require-all')(__dirname + '/src/target');

app();

async function app() {
  try {
    // console.log('--- Source ---');
    // let sourceProject = await source.projectInfo.getProjectAsync();
    // console.log(sourceProject);
    // console.log('--- Target ---');
    // let targetProject = await target.projectInfo.getProjectAsync();
    // console.log(targetProject);
    // let targetProjectVersion = targetProject.body.version;
    // let {currencies, languages, countries} = await source.projectInfo.getSourceProjectSettings();
    // console.log(currencies);
    // targetProjectVersion = await target.currencies.createCurrenciesAsync(targetProjectVersion, currencies);
    // targetProjectVersion = await target.languages.createLanguagesAsync(targetProjectVersion, languages);
    // await target.countries.createCountriesAsync(targetProjectVersion, countries);
    // let zones = await source.zones.getZones();
    // await target.zones.createZones(zones);
    let taxCategories = await source.taxes.getTaxCategories();
    await target.taxes.createTaxCategories(taxCategories);
  } catch (e) {
    console.log(e.message);
  }
}
