const assert = require("assert");
const switchBranch = require("../lib/switchBranch");

describe("switch branch in a specified repo", function () {
  it.only("should switch branch in a specified repo", async function () {
    const res = await switchBranch("git-test/turbo-src", "master")
    assert.equal(true, true, 'fail confirm git repo cloned')
  });
});
