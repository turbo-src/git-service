const assert = require("assert");
const crypto = require('crypto-js')
const fetchAndPullNewBranch = require("../lib/pushBranch");
const pushBranch = require("../lib/pushBranch");
const ensureRemoteExists = require("../lib/manageRemote");

//const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));
describe("Push a branch", function () {
  //this.timeout(3000);
  it("should push a branch", async function () {
    const remoteURL = "https://github.com/turbo-src/git-service"
    const remoteHashID = crypto.SHA256(remoteURL).toString(crypto.enc.Hex)

    assert.equal(
      remoteHashID,
      "66806c53dad8d713eef555fb85ef608def74b75b05eb0e54f6f9e38eec3e54b8",
      "failed to get a reprodicible hash ID"
    )

    const targetDir = `repos/${remoteHashID}`;

    await ensureRemoteExists(targetDir, 'gitea', 'https://localhost:3000/turbo-src/git-service')

    // get username and password from envar.
    await pushBranch(targetDir, 'git-service', 'gitea', gitea_username, gitea_password)
    await fetchAndPullNewBranch(remoteHashID, "test-git-service", remoteURL)
  });
});
