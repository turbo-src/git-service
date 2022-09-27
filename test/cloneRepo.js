const assert = require("assert");
const cloneRepo = require("../lib/cloneRepo");

describe("clone a repo", function () {
  it.only("should confirm repo was cloned", async function () {
    const res = await cloneRepo("turborsc-service", "https://github.com/turbo-src/service')
    assert.equesl(true, false, 'fail confirm git repo cloned')
  });
});
