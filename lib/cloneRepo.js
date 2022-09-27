const simpleGit = require('simple-git');

async function cloneRepo(
repoID,
remoteURL
) {
  try {
    const dir = repoID
    const git = simpleGit().clean(simpleGit.CleanOptions.FORCE);
    const res = await git.clone(remoteURL, repoID)
  } catch(error) {
   console.log(error)
  }
}
module.exports = cloneRepo;
