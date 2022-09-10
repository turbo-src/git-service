Small change
Another small change
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

Pseudocode for endpoints.

```
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
