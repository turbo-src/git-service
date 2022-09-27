const assert = require("assert");
const checkIsRepo = require("../lib/checkIsRepo");

describe("check a repo", function () {
  it("should confirm a repo exists", async function () {
    const res = await checkIsRepo('git-test/turbo-src')
    assert.equal(true, res, 'fail confirm git repo')
  });
  it.only("should confirm a repo doesn't exists", async function () {
    const res = await checkIsRepo('git-test/nada')
    assert.equal(false, res, "fail confirm git repo doesn't exist")
  });
});
