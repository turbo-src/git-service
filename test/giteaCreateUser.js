const assert = require("assert");
const GiteaAdminApi = require("../lib/giteaAdminApi");

describe("Create a user", function () {
  this.timeout(10_000);
  it("should create a user on gitea", async function () {
    const giteaAdmin = new GiteaAdminApi('http://gitea:3000/api/v1', 'api key');

    const userData = {
      email: "user@example.com",
      full_name: "Full Name",
      login_name: "loginname",
      must_change_password: false,
      password: "userpassword",
      restricted: true,
      send_notify: true,
      source_id: 0,
      username: "username",
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
