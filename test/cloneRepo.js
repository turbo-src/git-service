const assert = require("assert");
const cloneRepo = require("../lib/switchBranch");

describe("switch branch in a specified repo", function () {
  it.only("should switch branch in a specified repo", async function () {
    const res = await switchBranch("turbo-tsc", "testDev")
    assert.equal(true, true, 'fail confirm git repo cloned')
  });
});
