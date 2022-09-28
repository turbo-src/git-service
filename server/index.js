const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { db } = require("./db");
require("dotenv").config();

const {
  createIssue,
  getIssueID,
  getTsrcID,
  hashBranch,
} = require("../lib");

var schema = buildSchema(`
  type hashBranch {
    status: String!,
    defaultHash: String!,
    validHead: Boolean!
  }

  type Query {
    createIssue(repo: String, issue_id: String, tsrc_id: String): String,
    getIssueID(repo: String, tsrc_id: String,): String,
    getTsrcID(repo: String, issue_id: String): String,
    getDefaultHashBranch(repoID: String, remoteURL: String, branch: String, head: String): hashBranch,
  }
`);

var root = {
  getDefaultHashBranch: async (args) => {
    return await hashBranch.getDefaultHashBranch(
      args.repoID,
      args.remoteURL,
      args.branch,
      args.head
    );
  },
  createIssue: async (args) => {
    return await createIssue(
      args.repo,
      args.issue_id,
      args.tsrc_id
    );
  },
  getIssueID: async (args) => {
    return issueID = await getIssueID(
      args.repo,
      args.tsrc_id
    );
  },
  getTsrcID: async (args) => {
    return await getTsrcID(
      args.repo,
      args.issue_id,
    );
  },
};

const port = process.env.PORT || 4005;

const app = express();

app.listen(port);
console.log(
  `Namespace Server: Running a GraphQL API server on port ${port}/graphql`
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

try {
  //Will delete data delete data from db on npm start:
  db.sync({ force: true });

  //Will not delete data from db on npm start:
  // db.sync();

  db.authenticate();
  console.log(
    "Connection to the Postgres database has been established successfully."
  );
} catch (error) {
  console.error("Unable to connect to the Postgres database:", error);
}
