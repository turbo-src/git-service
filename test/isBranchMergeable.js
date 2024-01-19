
const assert = require("assert");
const crypto = require('crypto-js')
const isBranchMergeable = ("../lib/isBranchMergeable")

//const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));
describe("Mergeable branch", function () {
  //this.timeout(3000);
  const remoteURL = "https://github.com/turbo-src/git-service"
  const remoteHashID = crypto.SHA256(remoteURL).toString(crypto.enc.Hex)

  assert.equal(
    remoteHashID,
    "66806c53dad8d713eef555fb85ef608def74b75b05eb0e54f6f9e38eec3e54b8",
    "failed to get a reprodicible hash ID"
  )

  const targetDir = `repos/${remoteHashID}`;

  it("should indicate a branch is mergeable", async function () {
    assert.equal(
        await isBranchMergeable(targetDir, 'mergeableBranch'),
        true,
        "fail to indicate the branch is mergeable"
    )

  });

  it("should indicate a branch is not mergeable", async function () {
    assert.equal(
        await isBranchMergeable(targetDir, 'nonMergeableBranch'),
        faile,
        "fail to indicate the branch is not mergeable"
    )
  });
});
