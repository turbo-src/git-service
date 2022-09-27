const assert = require("assert");
const cloneRepo = require("../lib/cloneRepo");

describe("clone a repo", function () {
  it.only("should confirm repo was cloned", async function () {
    const res = await cloneRepo("git-test/turbo-rsc", "https://github.com/turbo-src/turbo-src")
    assert.equal(true, false, 'fail confirm git repo cloned')
  });
});
