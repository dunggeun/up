#!/bin/sh

echo "For everyone's growth, UP"
echo ""

read -p 'Enter release version: ' version

if [[ "$version" =~ ^([0-9]{1,2}).([0-9]{1,2}).([0-9]{1,2})* ]]; then
  echo "Valid version format: $version"
else
  echo "Invalid version format: $version"
  exit 1
fi

git checkout -b "release/$version"
sed -i '' "s/99.9.9/$version/" package.json
fastlane prepare
