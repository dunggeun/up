#!/bin/sh

version=$1

# purge from staging
git tag -d "v$version"
git branch -D "release/$version"

# purge from remote
git push origin -d "v$version"
git push origin -d "release/$version"
