const assert = require("assert");
const fetchAndPullNewBranch = require("../lib/fetchAndPullNewBranch");

//const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));
describe("check a repo", function () {
  //this.timeout(3000);
  it("should confirm a repo exists", async function () {
    await fetchAndPullNewBranch("git-test/turbo-src", "testDev", "https://github.com/turbo-src/turbo-src")
  });
});
