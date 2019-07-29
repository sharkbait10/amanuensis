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
    // let taxCategories = await source.taxes.getTaxCategories();
    // await target.taxes.createTaxCategories(taxCategories);
    // let shippingMethods = await source.shipping.getShippingMethods();
    // await target.shipping.createShippingMethods(shippingMethods);
    // let channels = await source.channels.getSourceChannels();
    // await target.channels.createChannels(channels);
    // let productTypes = await source.productTypes.getProductTypes();
    // await target.productTypes.createProductTypes(productTypes);
    // let categories = await source.categories.getAllCategories();
    // await target.categories.createCategories(categories);
    // let productDiscounts = await source.productDiscounts.getAllProductDiscounts();
    // await target.productDiscounts.createDiscounts(productDiscounts);
    // let cartDiscounts = await source.cartDiscounts.getAllCartDiscounts();
    // await target.cartDiscounts.createDiscounts(cartDiscounts);
    let discountCodes = await source.discountCodes.getAllDiscountCodes();
    await target.discountCodes.createDiscountCodes(discountCodes);
  } catch (e) {
    console.log(e.message);
  }
}
