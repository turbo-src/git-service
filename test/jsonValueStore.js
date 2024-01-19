const assert = require("assert");
const fs = require('fs');
const JsonKeyValueStore = require("../lib/jsonValueStore");

describe("Sets and gets values from json file", function () {
  this.timeout(10_000);

  const jsonFilePath = "/tmp/git-service-test-json-file.json";
  let store;

  before(function () {
    // Create a json file in /tmp
    store = new JsonKeyValueStore(jsonFilePath);
    store.setValue('initKey', 'initValue'); // This will create the file with an initial key-value

    // Assert the creation of the json file
    assert(fs.existsSync(jsonFilePath), "JSON file should be created");
  });

  it("sets key values in a json file", function() {
    // Set a value
    store.setValue('testKey', 'testValue');

    // Read the file directly to verify
    const rawData = fs.readFileSync(jsonFilePath);
    const jsonData = JSON.parse(rawData);

    assert.equal(jsonData.testKey, 'testValue', "Value should be set in the JSON file");
  });

  it("gets values by key in a json file", function() {
    // Get a value
    const value = store.getValue('testKey');

    assert.equal(value, 'testValueWrong', "Should return the correct value for a given key");
  });

  after(function () {
    // Delete the json file after the tests
    if (fs.existsSync(jsonFilePath)) {
      fs.unlinkSync(jsonFilePath);
    }

    // Assert that the json file was deleted
    assert(!fs.existsSync(jsonFilePath), "JSON file should be deleted");
  });
});

