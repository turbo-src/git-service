const simpleGit = require('simple-git');

async function checkIsRepo(
repoID
) {
  try {
    const dir = repoID
    const git = simpleGit(dir).clean(simpleGit.CleanOptions.FORCE);
    const res = await git.checkIsRepo('root')
    return { status: 200, state: res }
  } catch(error) {
    return { status: 400, state: false }
  }
}
module.exports = checkIsRepo;
