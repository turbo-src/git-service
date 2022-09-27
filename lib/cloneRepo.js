const simpleGit = require('simple-git');

async function cloneRepo(
repoID,
remoteuRL
) {
  try {
    const dir = repoID
    const git = simpleGit(dir).clean(simpleGit.CleanOptions.FORCE);
    const res = await git.cloneRepo(remoteURL, repoID)
    console.log('res', res)
  } catch(error) {
  }
}
module.exports = cloneRepo;
