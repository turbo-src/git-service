const assert = require("assert");
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto-js')
const getDefaultHashBranch = require("../lib/");

describe("hash a branch", function () {
  it("should hash branch of a turbosrc project", async function () {
    const branch = "master"
    const head = "9200b436014550faacc3cc31bf9fb55c2105e01a"
    const remoteURL = "https://github.com/turbo-src/turbo-src"
    const remoteHashID = crypto.SHA256(remoteURL).toString(crypto.enc.Hex)
    const resHashBranch = await getDefaultHashBranch(remoteHashID, remoteURL, branch, head)

    assert.deepEqual(
      resHashBranch,
      {
        status: 200,
        defaultHash: '6402fee6698164041b125358e6c14d7e5ef749b9b269f0d4712995d90ada1c96',
	validHead: true
      },
      'fail to get hash of branch'
    )
  });
  it("should hash branch of a non-turbosrc repo (e.g. a fork related to pull request)", async function () {
    const branch = "master"
    const head = "9200b436014550faacc3cc31bf9fb55c2105e01a"
    const remoteURL = "https://github.com/7db9a/turbo-src"
    const remoteHashID = crypto.SHA256(remoteURL).toString(crypto.enc.Hex)
    const resHashBranch = await getDefaultHashBranch(remoteHashID, remoteURL, branch, head)

    assert.deepEqual(
      resHashBranch,
      {
        status: 200,
        defaultHash: '763f8896b611689562091919f1e28699fefde22bb7a4567cd5d6a2f7e6776da5',
	validHead: true
      },
      'fail to get hash of branch'
    )
  });
  it("should hash branch of a non-turbosrc repo neovim at a specific branch", async function () {
    this.timeout(7000)
    const branch = "release-0.7"
    const head = "6ec04e590f72cd2b3803691f39d18cff7659ecf9"
    const remoteURL = "https://github.com/neovim/neovim"
    const remoteHashID = crypto.SHA256(remoteURL).toString(crypto.enc.Hex)
    const resHashBranch = await hashBranch.getDefaultHashBranch(remoteHashID, remoteURL, branch, head)

    assert.deepEqual(
      resHashBranch,
      {
        status: 200,
        defaultHash: 'fd1cc2d6865b9ae0ce5e9174f327a9b10d60ba7723d87628a546eaad8b9e8fad',
	validHead: true
      },
      'fail to get hash of branch'
    )
  });
});
