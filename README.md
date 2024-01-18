# Usage

```
docker-compose exec -it git-service bash test/run-tests.sh
docker-compose exec -it git-service bash test-server/run-tests.sh
````

## Strategy

Use gitea as underlying turbosrc pull requests.

1. Client provides remoteURL of pull request branch.

2. Client provides head of pull request branch.

3. Call `fetchAndPullBranch.js(repoID, branchName, forkRemoteURL)`

    repoID is calculated as follows:

    `crypto.SHA256(remoteURL).toString(crypto.enc.Hex)`

    branchName should be ${defaultHash/forkRemoteURL} to prevent clashes.

4. Verify branch head with `getBranchHead`.

5. Push branch to turbosrc-gitea's git.

   `pushBranch(repoID, remoteURL, branch)

6. Delete branch after the pull request is closed or is merged