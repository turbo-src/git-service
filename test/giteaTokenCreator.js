const assert = require("assert");
const GiteaTokenCreator = require("../lib/giteaTokenCreator");

describe("Create a user", function () {
  this.timeout(10_000);
  it("should create a user on gitea", async function () {
    const username = 'username';
    const password = 'password';
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
      const token = await giteaTokenCreator.createAccessToken(username, tokenDetails);
      console.log('Access token created:', token);
    } catch (error) {
      console.error('Failed to create access token:', error);
    }
  })
});