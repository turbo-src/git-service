const assert = require("assert");
const crypto = require('crypto-js')
const checkIsRepo = require("../lib/checkIsRepo");
const cloneRepo = require("../lib/cloneRepo");

const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));
describe("check a repo", function () {
  this.timeout(3000);
  it("should confirm a repo exists", async function () {
    const remoteURL = "https://github.com/turbo-service"
    const remoteHashID = crypto.SHA256(remoteURL).toString(crypto.enc.Hex)
    const resBefore = await checkIsRepo(remoteHashID)
    await cloneRepo(remoteHashID, remoteURL)
    const resAfter = await checkIsRepo(remoteHashID)
    assert.deepEqual(resBefore, { status: 400, state: false }, 'fail confirm git repo')
    assert.deepEqual(resAfter, { status: 200, state: true }, 'fail confirm git repo')
  });
  it("should confirm a repo doesn't exists", async function () {
    const res = await checkIsRepo('test-dir')
    assert.deepEqual(res, { "status": 200, "state": false }, "fail confirm git repo doesn't exist")
  });
  it("should confirm a dir doesn't exists", async function () {
    const res = await checkIsRepo('nada')
    assert.deepEqual(res, { "status": 400, "state": false }, "fail confirm git repo doesn't exist")
  });
});
