const assert = require("assert");
const checkIsRepo = require("../lib/checkIsRepo");
const cloneRepo = require("../lib/cloneRepo");

const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));
describe("check a repo", function () {
  this.timeout(3000);
  it("should confirm a repo exists", async function () {
    const resBefore = await checkIsRepo('turbo-src')
    await cloneRepo("turbo-src", "https://github.com/turbo-src/turbo-src")
    const resAfter = await checkIsRepo('turbo-src')
    assert.deepEqual(resBefore, { status: 400, state: false }, 'fail confirm git repo')
    assert.deepEqual(resAfter, { status: 200, state: true }, 'fail confirm git repo')
  });
  it("should confirm a repo doesn't exists", async function () {
    const res = await checkIsRepo('not-git')
    assert.deepEqual(res, { "status": 200, "state": false }, "fail confirm git repo doesn't exist")
  });
  it("should confirm a dir doesn't exists", async function () {
    const res = await checkIsRepo('nada')
    assert.deepEqual(res, { "status": 400, "state": false }, "fail confirm git repo doesn't exist")
  });
});
