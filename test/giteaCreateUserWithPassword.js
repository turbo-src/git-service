const assert = require("assert");
const GiteaAdminApi = require("../lib/giteaAdminApi");

describe("Create a user with password authentication", function () {
  this.timeout(10_000);
  it("should create a user on gitea", async function () {
    const adminUsername = 'username'; // Replace with actual admin username
    const adminPassword = 'password'; // Replace with actual admin password
    const giteaAdmin = new GiteaAdminApi('http://gitea:3000/api/v1', null); // Token not used here

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
      const response = await giteaAdmin.createUserWithPassword(adminUsername, adminPassword, userData);
      console.log('User created:', response);
      assert.ok(response.username === userData.username, 'Created user has the correct username');
    } catch (error) {
      console.error('Failed to create user:', error);
      assert.fail('Failed to create user');
    }
  });
});
