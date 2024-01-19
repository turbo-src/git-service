const simpleGit = require('simple-git');

/**
 * Checks if a remote exists in a git repository, and adds it if not.
 *
 * @param {string} targetDir - The local git repository directory.
 * @param {string} remoteName - The name of the remote repository (e.g., 'origin').
 * @param {string} remoteUrl - The URL of the remote repository.
 * @returns {Promise<void>} - A promise that resolves when the check is complete,
 *                            and the remote is added if it did not exist.
 */
async function ensureRemoteExists(targetDir, remoteName, remoteUrl) {
  try {
    const git = simpleGit(targetDir);

    // Get the list of existing remotes
    const remotes = await git.getRemotes();

    // Check if the remote already exists
    const remoteExists = remotes.some(remote => remote.name === remoteName);

    if (!remoteExists) {
      // Add the remote if it doesn't exist
      await git.addRemote(remoteName, remoteUrl);
      console.log(`Remote "${remoteName}" added to the repository.`);
    } else {
      console.log(`Remote "${remoteName}" already exists.`);
    }
  } catch (error) {
    console.error(`Error managing remote "${remoteName}":`, error.message);
    throw error; // Rethrow the error for further handling if necessary
  }
}

module.exports = ensureRemoteExists;
