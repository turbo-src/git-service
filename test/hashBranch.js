const assert = require("assert");
const { v4: uuidv4 } = require('uuid');
const switchBranch = require("../lib/switchBranch");
const hashBranch = require("../lib/hashBranch");

describe("hash a branch", function () {
  it("should switch to a specified branch and hash", async function () {
    const res = await hashBranch.tarAndGetHash("turbo-src", "master", "turbo-src")
    assert.deepEqual(
      res,
      {
        status: 200,
        defaultHash: 'f38fc74c622390aadb35b87519629e6601d6384b764ec52ef94fc859c1e5e3e3'
      },
      'fail to get hash of branch'
    )
  });
});
