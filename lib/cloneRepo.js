const fs = require('fs');
const path = require('path');
const simpleGit = require('simple-git');

async function cloneRepo(repoID, remoteURL) {
  try {
    const reposDir = 'repos';
    const targetDir = path.join(reposDir, repoID);

    // Ensure the 'repos' directory exists
    if (!fs.existsSync(reposDir)){
      fs.mkdirSync(reposDir);
    }

    const git = simpleGit()
    const res = await git.clone(remoteURL, targetDir, ['--recurse-submodules', '-j8']);
    return res;
  } catch (error) {
    console.log(error);
  }
}

module.exports = cloneRepo;
