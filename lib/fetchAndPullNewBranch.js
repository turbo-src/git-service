const simpleGit = require('simple-git');

async function fetchAndPullNewBranch(repoID, branch, remoteURL) {
  try {
    const git = simpleGit(`repos/${repoID}`);
    await git.fetch();
    await git.checkout(['-b', branch, '--track', 'origin/' + branch]);
    await git.pull(remoteURL, branch);
  } catch (error) {
    console.log(error);
  }
}

module.exports = fetchAndPullNewBranch;
