const assert = require("assert");
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto-js')
const hashBranch = require("../lib/hashBranch");

describe("hash a branch", function () {
  it("should hash branch of a turbosrc project", async function () {
    const branch = "master"
    const remoteURL = "https://github.com/turbo-src/turbo-src"
    const remoteHashID = crypto.SHA256(remoteURL).toString(crypto.enc.Hex)
    const resHashBranch = await hashBranch.getDefaultHashBranch(remoteHashID, remoteURL, branch)

    assert.deepEqual(
      resHashBranch,
      {
        status: 200,
        defaultHash: '6402fee6698164041b125358e6c14d7e5ef749b9b269f0d4712995d90ada1c96'
      },
      'fail to get hash of branch'
    )
  });
  it("should hash branch of a non-turbosrc repo (e.g. a fork related to pull request)", async function () {
    const branch = "master"
    const remoteURL = "https://github.com/7db9a/turbo-src"
    const remoteHashID = crypto.SHA256(remoteURL).toString(crypto.enc.Hex)
    const resHashBranch = await hashBranch.getDefaultHashBranch(remoteHashID, remoteURL, branch)

    assert.deepEqual(
      resHashBranch,
      {
        status: 200,
        defaultHash: '763f8896b611689562091919f1e28699fefde22bb7a4567cd5d6a2f7e6776da5'
      },
      'fail to get hash of branch'
    )
  });
});
