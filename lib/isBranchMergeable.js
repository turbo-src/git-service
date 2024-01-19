const simpleGit = require('simple-git');

/**
 * Checks if a specified branch can be merged into the current branch without conflicts.
 *
 * @param {string} targetDir - The local git repository directory.
 * @param {string} branchName - The name of the branch to check.
 * @returns {Promise<boolean>} - A promise that resolves to `true` if the branch is mergeable, `false` otherwise.
 */
async function isBranchMergeable(targetDir, branchName) {
  try {
    const git = simpleGit(targetDir);

    // Fetch the latest changes for all branches
    await git.fetch();

    // Attempt a dry-run merge to see if there are conflicts
    await git.merge([branchName, '--no-commit', '--no-ff', '--dry-run']);

    return true; // If no errors, the branch is mergeable
  } catch (error) {
    if (error.message.includes('CONFLICT')) {
      return false; // Merge conflicts detected
    }
    throw error; // Other errors should be thrown
  }
}

module.exports = isBranchMergeable;
