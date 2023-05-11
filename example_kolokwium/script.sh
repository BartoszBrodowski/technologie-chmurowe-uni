#!/bin/bash

GIT_REPO=$1
echo $GIT_REPO
docker builder prune -f
docker network create app_network --driver bridge
docker build -t kolokwium --build-arg GIT_REPO=$GIT_REPO .
docker run -d --network app_network -p 80:80 kolokwium