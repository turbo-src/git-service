const assert = require("assert");
const switchBranch = require("../lib/switchBranch");

describe("switch branch in a specified repo", function () {
  it("should switch branch in a specified repo", async function () {
    const res = await switchBranch("turbo-src", "master")
    const resNoBranch = await switchBranch("turbo-src", "nada")
    assert.equal(res, 200, 'fail confirm git repo cloned')
    assert.equal(resNoBranch, 400, 'fail confirm git repo cloned')
  });
});
