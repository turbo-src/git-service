const assert = require("assert");
const GiteaApi = require("../lib/giteaApi");

describe("Clone a repo", function () {
  this.timeout(10_000);
  it("should create a repo on gitea", async function () {
    const gitea = new GiteaApi('http://gitea:3000/api/v1', 'api key');

    const repoDetails = {
      auto_init: false,
      default_branch: "main",
      description: "Example repository",
      name: "git-service-repo-id",
      private: false
    };

    try {
      const response = await gitea.createRepo(repoDetails);
      console.log('Repository created:', response);
    } catch (error) {
      console.error('Failed to create repository:', error);
    }
  })
});
