const assert = require("assert");
const { v4: uuidv4 } = require('uuid');
const switchBranch = require("../lib/switchBranch");
const hashBranch = require("../lib/hashBranch");
const checkIsRepo = require("../lib/checkIsRepo");
const cloneRepo = require("../lib/cloneRepo");
const fetchAndPullNewBranch = require("../lib/fetchAndPullNewBranch");

describe("hash a branch", function () {
  it("should clone repo if doesn't exist, fetch and pull branches, and hash", async function () {
    let good = false
    const branch = "master"
    const repoID = "turbo-src"
    const remoteURL = "https://github.com/turbo-src/turbo-src"
    
    const resRepo = await checkIsRepo(repoID)
    if (resRepo.status === 400) {
      await cloneRepo(repoID, remoteURL)
      good = true
    } else if (resRepo === { status: 200, state: false }) {
      good = false
    } else {
      await fetchAndPullNewBranch(repoID, branch, remoteURL)
      good = true
    }
    const resHashBranch = await hashBranch.tarAndGetHash(repoID, branch, repoID)
    assert.equal(good, true, "There is a dir with repoID name, but it doesn't have a git work tree.")
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
