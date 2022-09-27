const assert = require("assert");
const checkIsRepo = require("../lib/checkIsRepo");

describe("check a repo", function () {
  it.only("should confirm a repo exists", async function () {
    const res = await checkIsRepo('git-test/turbo-src')
    assert.deepEqual(res, { status: 200, state: true }, 'fail confirm git repo')
  });
  it("should confirm a repo doesn't exists", async function () {
    const res = await checkIsRepo('git-test/nada')
    assert.deepEqual(res, { "status": 200, "state": false }, "fail confirm git repo doesn't exist")
  });
  it("should confirm a dir doesn't exists", async function () {
    const res = await checkIsRepo('git-test/not-a-dir')
    assert.deepEqual(res, { "status": 200, "state": false }, "fail confirm git repo doesn't exist")
  });
});
