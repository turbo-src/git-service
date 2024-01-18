const assert = require("assert");
const crypto = require('crypto-js')
const cloneRepo = require("../lib/cloneRepo");
const checkIsRepo = require("../lib/checkIsRepo");

describe("Clone a repo", function () {
  this.timeout(10_000);
  it.only("should clone a repo repo", async function () {
    const remoteURL = "https://github.com/turbo-src/git-service"
    const remoteHashID = crypto.SHA256(remoteURL).toString(crypto.enc.Hex)
    res = await cloneRepo(remoteHashID, remoteURL)
    console.log('clone res', res)
    const repoExists = await checkIsRepo(remoteHashID)
    assert.equal(
      remoteHashID,
      "66806c53dad8d713eef555fb85ef608def74b75b05eb0e54f6f9e38eec3e54b8",
      "failed to get a reprodicible hash ID"
    )
    assert.deepEqual(repoExists, { status: 200, state: true }, 'fail confirm git repo')

  });
});
