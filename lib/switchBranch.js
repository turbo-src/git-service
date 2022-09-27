const simpleGit = require('simple-git');

async function switchBranch(
repoID,
branch,
) {
  try {
    const dir = repoID
    const git = simpleGit(repoID).clean(simpleGit.CleanOptions.FORCE);
    await git.checkout(branch)
  } catch(error) {
   console.log(error)
  }
}
module.exports = switchBranch;
