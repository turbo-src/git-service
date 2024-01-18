const assert = require("assert");
const crypto = require('crypto-js')
const getBranchHead = require("../lib/getBranchHead");

//const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));
describe("Add a branch", function () {
  //this.timeout(3000);
  it("should confirm a repo exists", async function () {
    const remoteURL = "https://github.com/turbo-src/git-service"
    const remoteHashID = crypto.SHA256(remoteURL).toString(crypto.enc.Hex)

    assert.equal(
      remoteHashID,
      "66806c53dad8d713eef555fb85ef608def74b75b05eb0e54f6f9e38eec3e54b8",
      "failed to get a reprodicible hash ID"
    )

    res = await getBranchHead(remoteHashID, 'test-git-service')

    assert.equal(
      res,
      { status: 200, head: 'foo'}
    )
  });
});
