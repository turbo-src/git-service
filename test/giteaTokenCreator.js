const assert = require("assert");
const fs = require('fs');
const GiteaTokenCreator = require("../lib/giteaTokenCreator");
const JsonKeyValueStore = require("../lib/jsonValueStore");

describe("Create a user", function () {
  this.timeout(10_000);

  const jsonFilePath = "./turbosrc.config";
  let store
  before(async () => {
    store = new JsonKeyValueStore(jsonFilePath);
    assert(fs.existsSync(jsonFilePath), "config file should be created");
  });
  it("should create an access token for gitea admin user", async function () {
    const username = store.getValue('GithubName');
    const password = store.getValue('GithubPassword');
    let token

    const giteaTokenCreator = new GiteaTokenCreator('http://gitea:3000/api/v1', username, password);

    const tokenDetails = {
      name: "myAccessToken",
      scopes: [
        "read:repository",
        "write:repository",
        "read:user",
        "write:user"
      ]
    };

    try {
      token = await giteaTokenCreator.createAccessToken(username, tokenDetails);
      console.log('Access token created:', token);
    } catch (error) {
      console.error('Failed to create access token:', error);
    }

    store.setValue('GithubApiToken', token['sha1']);

    assert.equal(
      store.getValue('GithubApiToken'),
      token['sha1'],
      'fail to set config with new acess token'
    )
  })
});