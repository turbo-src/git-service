const assert = require("assert");
const crypto = require('crypto-js')
const fetchAndPullNewBranch = require("../lib/fetchAndPullNewBranch");

//const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));
describe("check a repo", function () {
  //this.timeout(3000);
  it("should confirm a repo exists", async function () {
    const remoteURL = "https://github.com/turbo-src/turbo-src"
    const remoteHashID = crypto.SHA256(remoteURL).toString(crypto.enc.Hex)
    await fetchAndPullNewBranch(remoteHashID, "testDev", remoteURL)
  });
});
