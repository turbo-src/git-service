FROM golang:1.16.15

RUN go get github.com/dustin/gitmirror

WORKDIR /usr/local/git-mirrors
