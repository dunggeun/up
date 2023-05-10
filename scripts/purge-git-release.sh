#!/bin/sh

version=$1

# purge from staging
git tag -d $version
git branch -D "release/$version"

# purge from remote
git push origin -d $version
git push origin -d "release/$version"
