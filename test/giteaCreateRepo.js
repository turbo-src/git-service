const assert = require("assert");
const fs = require('fs');
const GiteaApi = require("../lib/giteaApi");
const GiteaTokenCreator = require("../lib/giteaTokenCreator");
const JsonKeyValueStore = require("../lib/jsonValueStore");

describe("Clone a repo", function () {
  this.timeout(10_000);
  const jsonFilePath = "./turbosrc.config";
  let store
  let token
  before(async () => {
    store = new JsonKeyValueStore(jsonFilePath);
    assert(fs.existsSync(jsonFilePath), "config file should be created");
    token = store.getValue('GithubApiToken')
  });
  it("should create a repo on gitea", async function () {
    const gitea = new GiteaApi('http://gitea:3000/api/v1', token);

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

    assert.equal(
      response['full_name'],
      'turbosrc/git-service-repo-id',
      'fail to createRepo'
    )
  })
});
