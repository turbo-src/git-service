const assert = require("assert");
const checkIsRepo = require("../lib/checkIsRepo");

describe("check a repo", function () {
  it("should confirm a repo exists", async function () {
    const res = await checkIsRepo('git-test/turbo-src')
    assert.equal(res, { "status": 200, "state": true }, 'fail confirm git repo')
  });
  it("should confirm a repo doesn't exists", async function () {
    const res = await checkIsRepo('git-test/nada')
    assert.deepEqual(res, { "status": 200, "state": false }, "fail confirm git repo doesn't exist")
  });
});
