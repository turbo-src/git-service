const assert = require("assert");
const fs = require('fs');
const GiteaAdminApi = require("../lib/giteaAdminApi");
const JsonKeyValueStore = require("../lib/jsonValueStore");

describe("Create a user with password authentication", function () {
  this.timeout(10_000);
  const jsonFilePath = "./turbosrc.config";
  let store
  let admin_username
  let admin_password
  before(async () => {
    store = new JsonKeyValueStore(jsonFilePath);
    assert(fs.existsSync(jsonFilePath), "config file should be created");
    admin_username = store.getValue('GithubName');
    admin_password = store.getValue('GithubPassword');
  });
  it("should create a user on gitea", async function () {
    const giteaAdmin = new GiteaAdminApi('http://gitea:3000/api/v1', null); // Token not used here

    const userData = {
      email: "user2@example.com",
      full_name: "User Two",
      login_name: "user2",
      must_change_password: false,
      password: "userpassword2",
      restricted: true,
      send_notify: true,
      source_id: 0,
      username: "user2",
      visibility: "public" // or other visibility options
    };

    try {
      const response = await giteaAdmin.createUserWithPassword(admin_username, admin_password, userData);
      console.log('User created:', response);
      assert.ok(response.username === userData.username, 'Created user has the correct username');
    } catch (error) {
      console.error('Failed to create user:', error);
      assert.fail('Failed to create user');
    }
  });
});
