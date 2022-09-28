const simpleGit = require('simple-git');

async function getBranchHead(
repoID,
branch,
) {
  try {
    const dir = repoID
    const git = simpleGit(`repos/${repoID}`).clean(simpleGit.CleanOptions.FORCE);
    await git.checkout(branch)
    const head = await git.revparse('HEAD')
    return { status: 200, head: head }
  } catch(error) {
    return { status: 500, head: 'invalid' }
  }
}
module.exports = getBranchHead;
