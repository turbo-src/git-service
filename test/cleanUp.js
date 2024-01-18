const assert = require("assert");
const crypto = require('crypto-js');
const fs = require('fs');
const cloneRepo = require("../lib/cloneRepo");
const checkIsRepo = require("../lib/checkIsRepo"); // Assuming you have this function

describe("Clean up test environment.", function () {
  this.timeout(10_000);

  const remoteURL = "https://github.com/turbo-src/git-service";
  const remoteHashID = crypto.SHA256(remoteURL).toString(crypto.enc.Hex);
  const repoPath = `repos/${remoteHashID}`;

  before(function () {
    // Clone the repo before testing
    // Ensure the repoPath exists
  });

  it("should perform some tests", function() {
    // Perform your tests here
  });

  after(function () {
    // Delete the directory after the tests
    if (fs.existsSync(repoPath)) {
      fs.rmSync(repoPath, { recursive: true, force: true });
    }

    // Assert that the directory was deleted
    assert.strictEqual(fs.existsSync(repoPath), true, "Directory was not deleted");
  });
});
