const simpleGit = require('simple-git');
const sha256 = require('crypto-js/sha256');
const fs = require('fs')
const { exec } = require('child_process');
const childProcess = require("child_process");
const { v4: uuidv4 } = require('uuid');
const switchBranch = require("./switchBranch");
const checkIsRepo = require("./checkIsRepo");
const cloneRepo = require("./cloneRepo");
const fetchAndPullNewBranch = require("./fetchAndPullNewBranch");


/**
 * @param {string} command A shell command to execute
 * @return {Promise<string>} A promise that resolve to the output of the shell command, or an error
 * @example const output = await execute("ls -alh");
 */
function execute(command) {
  /**
   * @param {Function} resolve A function that resolves the promise
   * @param {Function} reject A function that fails the promise
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
   */
  return new Promise(function(resolve, reject) {
    /**
     * @param {Error} error An error triggered during the execution of the childProcess.exec command
     * @param {string|Buffer} standardOutput The result of the shell command execution
     * @param {string|Buffer} standardError The error resulting of the shell command execution
     * @see https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
     */
    childProcess.exec(command, function(error, standardOutput, standardError) {
      if (error) {
        reject();

        return;
      }

      if (standardError) {
        reject(standardError);

        return;
      }

      resolve(standardOutput);
    });
  });
}

async function getSha256(tarName) {
  let result = await execute(`sha256sum /tmp/${tarName}.tar`)
  let sha256 = result.split(' ')[0]
  console.log('sha256', sha256)
  return sha256
}

async function tarRepo(repoID, tarName) {
   await execute(`tar \
     --exclude=".git" \
     --sort=name \
    --mtime='1999-12-25 00:00:00' \
    --owner=0 --group=0 --numeric-owner \
    --pax-option=exthdr.name=%d/PaxHeaders/%f,delete=atime,delete=ctime \
    -cf /tmp/${tarName}.tar repos/${repoID}`)
}

async function tarAndGetHash(repoID, branch) {
    try {
      let id
      let sha256
      const resSwitchBranch = await switchBranch(repoID, branch)
      if (resSwitchBranch === 200) {
        id = uuidv4()
        await tarRepo(repoID, `${repoID}-${branch}-${id}`)
        sha256 = await getSha256(`${repoID}-${branch}-${id}`)
        return { status: 200, defaultHash: sha256 }
      } else {
	return { status: 400, defaultHash: 'invalid' }
      }
    } catch(error) {
      return { status: 500, defaultHash: 'invalid' }
    }
}


//Right now it just makes the dir with oid as a name.
const hashBranch = {
  getDefaultHashBranch: async function(repoID, remoteURL, branch) {
    try {
      let good = false
      const resRepo = await checkIsRepo(repoID)
      if (resRepo.status === 400) {
        await cloneRepo(repoID, remoteURL)
        good = true
      } else if (resRepo === { status: 200, state: false }) {
        good = false
      } else {
        await fetchAndPullNewBranch(repoID, branch, remoteURL)
        good = true
      }

      if (!good) {
         return { status: 400, defaultHash: 'invalid' }
      }

      const resHashBranch = await tarAndGetHash(repoID, branch, repoID)
      return resHashBranch
    } catch(error) {
      return { status: 500, defaultHash: 'invalid' }
    }
  },
  // Fork is the issue_id or other uuid of fork from pull request.
  pullForkUtil: async function(repo, forkOid, url, branch) {
    const baseDir = 'repos/' + repo
    const dir = baseDir + '/' + forkOid;

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    const options = {
       baseDir: process.cwd() + '/' + dir,
       binary: 'git',
       maxConcurrentProcesses: 6,
    };

    const git = simpleGit(options);

    await git.init();
    console.log(url)
    console.log(branch)
    try {
       await git.addRemote('origin', url)
    } catch {
      console.log('remote may already exist')
    }
    try {
      await git.fetch(['origin', branch]);
    } catch {
      console.log('fetch failed')
    }
    await git.checkout(branch);

    const gitDir = dir + '/.git'
    // delete directory recursively
    await fs.promises.rm(gitDir, { recursive: true }, (err) => {
      if (err) {
          throw err;
      }

      console.log(`${gitDir} is deleted!`);
    });

    //await new Promise(resolve => setTimeout(resolve, 3000));
    await tarRepo(baseDir, forkOid)
    //await new Promise(resolve => setTimeout(resolve, 5000));
    const forkSha256 = await getSha256Fork(baseDir, forkOid)


    return forkSha256
  },
}

module.exports = hashBranch
