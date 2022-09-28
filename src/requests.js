const superagent = require("superagent");
require("dotenv").config();

const port =
  process.env.NODE_ENV === "fly"
    ? "https://git-db.fly.dev"
    : "http://localhost:4005";

var root = {
  getDefaultHashBranch: async (
    repo_id,
    remote_url,
    branch,
    head
  ) => {
  const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ getDefaultHashBranch(repo_id: "${repo_id}", remote_url: "${remote_url}", branch: "${branch}", head: "${head}") }`,
      })
      .set("accept", "json")
      const json = JSON.parse(res.text);
      return json.data.getDefaultHashBranch;
  },
  postCreateIssue: async (
    repo,
    issue_id,
    tsrc_id
  ) => {
  const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ createIssue(repo: "${repo}", issue_id: "${issue_id}", tsrc_id: "${tsrc_id}") }`,
      })
      .set("accept", "json")
      const json = JSON.parse(res.text);
      return json.data.createIssue;
  },
  postGetIssueID: async (repo, tsrc_id) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ getIssueID(repo: "${repo}", tsrc_id: "${tsrc_id}") }`,
      })
      .set("accept", "json");
    const json = JSON.parse(res.text);
    return json.data.getIssueID;
  },
  postGetTsrcID: async (repo, issue_id) => {
    const res = await superagent
      .post(`${port}/graphql`)
      .send({
        query: `{ getTsrcID(repo: "${repo}", issue_id: "${issue_id}") }`,
      })
      .set("accept", "json");
    const json = JSON.parse(res.text);
    return json.data.getTsrcID;
  },
};

module.exports = root;
