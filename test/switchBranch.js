const assert = require("assert");
const crypto = require('crypto-js')
const switchBranch = require("../lib/switchBranch");

describe("switch branch in a specified repo", function () {
  it("should switch branch in a specified repo", async function () {
    const remoteURL = "https://github.com/turbo-src/git-service"
    const remoteHashID = crypto.SHA256(remoteURL).toString(crypto.enc.Hex)
    const res = await switchBranch(remoteHashID, "master")
    const resNoBranch = await switchBranch(remoteHashID, "nada")
    assert.equal(res, 200, 'fail confirm git repo cloned')
    assert.equal(resNoBranch, 400, 'fail confirm git repo cloned')
  });
});
