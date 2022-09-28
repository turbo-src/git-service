const simpleGit = require('simple-git');

async function fetchAndPullNewBranch(
repoID,
branch,
remoteURL
) {
  try {
    const git = simpleGit(`repos/${repoID}`).clean(simpleGit.CleanOptions.FORCE);
    await git.fetch(remoteURL, branch)
    await git.checkout(branch)
    await git.pull(remoteURL, branch)
  } catch(error) {
   console.log(error)
  }
}
module.exports = fetchAndPullNewBranch;
