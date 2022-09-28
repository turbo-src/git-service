const simpleGit = require('simple-git');

async function switchBranch(
repoID,
branch,
) {
  try {
    const dir = repoID
    const git = simpleGit(`repos/${repoID}`).clean(simpleGit.CleanOptions.FORCE);
    await git.checkout(branch)
    return 200
  } catch(error) {
   return 400
  }
}
module.exports = switchBranch;
