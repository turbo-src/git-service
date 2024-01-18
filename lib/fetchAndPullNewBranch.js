const simpleGit = require('simple-git');

async function fetchAndPullNewBranch(repoID, branch, remoteURL) {
  try {
    const git = simpleGit(`repos/${repoID}`);
    await git.fetch();

    // Check if the branch already exists locally
    const branchSummary = await git.branchLocal();
    if (branchSummary.all.includes(branch)) {
      // If the branch exists, just checkout
      await git.checkout(branch);
    } else {
      // If the branch does not exist, create and track it
      await git.checkout(['-b', branch, '--track', 'origin/' + branch]);
    }

    await git.pull(remoteURL, branch);
  } catch (error) {
    console.log(error);
  }
}

module.exports = fetchAndPullNewBranch;
