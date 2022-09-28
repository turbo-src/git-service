const assert = require("assert");
const { v4: uuidv4 } = require('uuid');
const hashBranch = require("../lib/hashBranch");

describe("hash a branch", function () {
  it("should hash branch of a turbosrc project", async function () {
    const branch = "master"
    const repoID = "turbo-src"
    const remoteURL = "https://github.com/turbo-src/turbo-src"
    
    const resHashBranch = await hashBranch.getDefaultHashBranch(repoID, remoteURL, branch)

    assert.deepEqual(
      resHashBranch,
      {
        status: 200,
        defaultHash: 'f38fc74c622390aadb35b87519629e6601d6384b764ec52ef94fc859c1e5e3e3'
      },
      'fail to get hash of branch'
    )
  });
  it("should hash branch of a non-turbosrc repo (e.g. a fork related to pull request)", async function () {
    const branch = "master"
    const remoteURL = "https://github.com/7db9a/turbo-src"
    const repoID = echo $TEXT | sed 's/:\/\//-domainPrefix-/; s/\//-pathForwardSlash-/g'

    const resHashBranch = await hashBranch.getDefaultHashBranch(repoID, remoteURL, branch)

    assert.deepEqual(
      resHashBranch,
      {
        status: 200,
        defaultHash: 'f38fc74c622390aadb35b87519629e6601d6384b764ec52ef94fc859c1e5e3e3'
      },
      'fail to get hash of branch'
    )
  });
});
