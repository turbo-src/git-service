const simpleGit = require('simple-git');
const url = require('url');

/**
 * Pushes a specified branch to a remote repository using provided credentials.
 * 
 * @param {string} targetDir - The local git repository directory.
 * @param {string} branchName - The name of the branch to push.
 * @param {string} remoteName - The name of the remote repository (e.g., 'origin').
 * @param {string} remoteUrl - The URL of the remote repository.
 * @param {string} username - The username for authentication.
 * @param {string} password - The password for authentication.
 * @returns {Promise<void>} - A promise that resolves when the push is complete.
 */
async function pushBranchWithCredentials(targetDir, branchName, remoteName, remoteUrl, username, password) {
  try {
    const git = simpleGit(targetDir);

    // Parse the remote URL and insert credentials
    const parsedUrl = new url.URL(remoteUrl);
    parsedUrl.username = encodeURIComponent(username);
    parsedUrl.password = encodeURIComponent(password);
    const remoteUrlWithCredentials = parsedUrl.href;

    // Set remote URL with credentials
    await git.removeRemote(remoteName); // Remove existing remote
    await git.addRemote(remoteName, remoteUrlWithCredentials);

    // Checkout the branch
    await git.checkout(branchName);

    // Push the branch to the remote repository
    await git.push(remoteName, branchName);

    console.log(`Branch "${branchName}" successfully pushed to "${remoteName}"`);
  } catch (error) {
    console.error(`Error pushing branch "${branchName}":`, error.message);
    throw error;
  } finally {
    // Revert remote URL to original (without credentials) for security
    await git.removeRemote(remoteName);
    await git.addRemote(remoteName, remoteUrl);
  }
}

module.exports = pushBranchWithCredentials;
