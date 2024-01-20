const assert = require("assert");
const GiteaAdminApi = require("../lib/giteaAdminApi");
const fs = require('fs');
const GiteaTokenCreator = require("../lib/giteaTokenCreator");
const JsonKeyValueStore = require("../lib/jsonValueStore");

describe("Create a user", function () {
  this.timeout(10_000);
  const jsonFilePath = "./turbosrc.config";
  let store
  let token
  before(async () => {
    store = new JsonKeyValueStore(jsonFilePath);
    assert(fs.existsSync(jsonFilePath), "config file should be created");
    token = store.getValue('GithubApiToken')
    console.log('token', token)
  });
  it("should create a user on gitea", async function () {
    const giteaAdmin = new GiteaAdminApi('http://gitea:3000/api/v1', token);

    const userData = {
      email: "user@example.com",
      full_name: "User",
      login_name: "user",
      must_change_password: false,
      password: "userpassword",
      restricted: true,
      send_notify: true,
      source_id: 0,
      username: "user",
      visibility: "public" // or other visibility options
    };

    try {
      const response = await giteaAdmin.createUser(userData);
      console.log('User created:', response);
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  })
});
