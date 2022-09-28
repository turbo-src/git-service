const assert = require("assert");
const { v4: uuidv4 } = require('uuid');
const switchBranch = require("../lib/switchBranch");
const hashBranch = require("../lib/hashBranch");

describe("hash a branch", function () {
  it("should switch to a specified branch and hash", async function () {
    const res = await switchBranch("turbo-src", "master")
    const id = uuidv4()
    await hashBranch.tarRepo("turbo-src", `turbo-src-${id}`)
    const sha256 = await hashBranch.getSha256(`turbo-src-${id}`)
    assert.equal(res, 200, 'fail confirm git repo cloned')
    assert.equal(
	    sha256,
	    'f38fc74c622390aadb35b87519629e6601d6384b764ec52ef94fc859c1e5e3e3',
	    'fail to get sha256 of rep'
    )
  });
});
