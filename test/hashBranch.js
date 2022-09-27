const assert = require("assert");
const switchBranch = require("../lib/switchBranch");
const hashBranch = require("../lib/hashBranch");

describe("hash a branch", function () {
  it("should switch to a specified branch and hash", async function () {
    const res = await switchBranch("git-test/turbo-src", "master")
    await hashBranch.tarRepo("git-test/turbo-src")
    assert.equal(res, 200, 'fail confirm git repo cloned')
  });
});
