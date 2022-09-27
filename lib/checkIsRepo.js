const simpleGit = require('simple-git');

async function checkIsRepo(
repoID
) {
  try {
    const git = simpleGit().clean(simpleGit.CleanOptions.FORCE);
    const res await checkIsRepo('turbo-src')
    return res
} catch(error) {
}
module.exports = checkIsRepo;
