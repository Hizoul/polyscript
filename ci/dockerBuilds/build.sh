#!/bin/sh
docker build -t="mmb2/$1" ./$1
# docker build -t="mmb2/$1" --no-cache ./$1