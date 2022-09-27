const assert = require("assert");
const switchBranch = require("../lib/switchBranch");
const hashBranch = require("../lib/hashBranch");

describe("hash a branch", function () {
  it("should switch to a specified branch and hash", async function () {
    const res = await switchBranch("git-test/turbo-src", "master")
    await hashBranch.tarRepo("git-test/turbo-src")
    const sha256 = await hashBranch.getSha256("git-test/turbo-src")
    assert.equal(res, 200, 'fail confirm git repo cloned')
    assert.equal(
	    sha256,
	    '627107bceae7c0207976a53d0208a39d359404ea6e5c177522ae7d354e1bbee7',
	    'fail to get sha256 of rep'
    )
  });
});
