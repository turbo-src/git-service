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



