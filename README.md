Rapid experiment to deploy a git service.

# Setup

```
docker volume create turbosrc-git-service-mirrors
```

# Usage

```
docker-compose up --build
```

Enter container.

```
docker exec -it turbosrc-git-service-web-1 bash
```

Run gitmirror.

```
/go/bin/gitmirror  -git=/usr/bin/git -dir=/usr/local/git-mirrors
``

Clone the project you want as a mirror.

```
git clone --mirror https://github.com/<owner>/<repo>
```

Sync the repo.

```
curl http://localhost:8124/<repo>.git
```

# Notes

## Story

User tokenizes.
   Repo is created. RepoID generated. Tokens created.
User visits Github page
   verifyRepo
   if not verified, 
User transfers tokens.
   verifyRepo
   transfer if verification succeeds.
   
Users vote to merge
   implicit verification

## Pseudocode
Repo:
  $repoID-$branch:
     $branch,
     $head,
     $defaultHash

fn removeMirror

fn mirrorExists

fn verifyBranch

fn verifyRepo

var expectedHead (must come from Turbosrc service)

var baseBranchLastPR (must come from Turbosrc service)
var repoID (must come from Turbosrc service

# If branch is in conflict (unauthorized pushed commits), then it is rebased to 
postVerifyRepo(repoID, baseBranchLastPR)
  verifyRepo(repoID, baseBranchLastPR)

# If branch is in conflict (unauthorized pushed commits), then it is rebased to   
postVerifyBranch(repoID, branch, expectedHead)
  expectedHead = getHead(branch)
  if !verifyBranch(repoID, baseBaseBranchLastPR, expectedHead)
     rebaseBranch(repoID, baseBranch

verifyBranch(repoID, branch)
   attempts = 0
   while attempts <= 4 // Takes 4 attempts to exhaust all conditional branches.
     if !mirrorExists(repoID)
        syncMirror(repoID)
	++attempts
        verifyBranch(repoID, branch)
     if checkMirrorBranchHead(repoID, branch)
       if checkMirrorBranchDefaultHash(repoID, branch, expectedHead)
         return true
        else
	  ++attempts
          syncMirror(repoID, branch)
	  verifyBranch(repoID, branch, expectedHead)
     else
       # use -D flag on gitmirror's curl command when on wait()
       syncMirror(repoID)
       ++attempts
       verifyBranch(repoID, branch, expectedHead)
    return false
       
checkMirrorBranchDefaultHash(repoID, branch, expectedHead)
   if getDefaultHash(repoID, branch) == expectedHead
      return true
   else
      return false

checkMirrorBranchHead(repoID, branch, expectedHead)
   if getHead(repoID, branch) == expectedHead
      return true
   else
      return false

addBranch(repoID, branch)

getDefaultHash(repoID, branch)
   queryDefaultHash(repoID, branch)
   

getHead(repoID, branch)
   queryHead(repoID, branch)

Pseudocode for endpoints.

import subprocess

repoSchema:
   repoID,
   defaultHash,
   branch:
      branchName,
      head       # Requesters pass in latestHEAD, so if it's different than on DB, git-server will update repo.

# Public
fn postMirrorRepo(repoID,)
  gitURL = getGitURL(repoID)
  mirrorRepo(repoID, gitURL)

fn getDefaultHash(repoID, branch, headLatest)
   if compareHead(repoID, branch, headLatest)
      syncRepo(repoID)
      updateDB(repoID, branch, latestHead)
      getDefaultHash(repoID, branch, latestHead)

   defautlHash.query.sql(repoID, branch)

# Private
// Purge repos with no commits (i.e. vote merges for 3 months).
// Can be cronjob at night.
fn garbageCollect:
   for repoID in repo:
      for branch in branches:
         date = lastCommitDate(branch)
	 if monthsElapsed(date) > 3
	    purge(repoID)

fn addRepo(repoID, gitURL)
   sql.insert.repos(repoID, gitURL)
   // default values for branch

fn mirrorRepo(repoID)
  res = subprocess
  .Popen(["git", "clone", "--mirror", `${gitURL}`])
  .wait

  mirrorReturnCode(res)

fn updateDB(repoID, branch, latestHead):
   defaultHashLatest = calculateDefaultHash(repoID, branch)
   updateHEAD.sql.insert(repoID, branch, latestHead
   updateDefaultHash.sql.insert(repoID, branch, latestHead)

fn compareBranchHEAD(repoID, branch, headLatest):
   savedHead = getBranchHead(repoID, branch)
   result = savedHead != headLatest

   result


fn syncRepo(repoID)
  if sanity(repoID):
     subprocess.run(["curl", "http://localhost:8124/`${repoID}`.git"])
  else
     delete(repoID)
     mirrorRepo(repoID)

fn sanity(repoID)
  res = subprocess.run(["git", "fsck", "--path", `${repoID}`])
        .Popen
	.wait

  sanityReturn(res)

fn getDefaultHash(repoID)
  return query.default.sql(repoID)


fn calculateDefaultHash
   # tar and sha256 command.

   # Possibly just sha256 as git mirror has idental refs to upstream.
   # However, what about about if there is a breaking change to git too?
   # defaultHash would not be deterministic. Furthmore, Turbosrc is
   # can be used with any vcs and not just git.

fn getGitURL(repoID)
   return query.sql(repoID)

```

Python wait subprocesss.

```
import subprocess
subprocess.run(["ls", "-l"])
```

Python wait for subprocess to complete.

```
process = subprocess.Popen(["your_cmd"]...)
process.wait()
```
https://stackoverflow.com/questions/28284715/python-subprocess-popen-wait-for-completion

How to git fetch and checkout without creating a remote branch locally?
```
git fetch git://github.com/xxx/xxx.git branch_name && git merge FETCH_HEAD
```
https://stackoverflow.com/questions/10200307/how-to-git-fetch-and-checkout-without-creating-a-remote-branch-locally
