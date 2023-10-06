#!/bin/bash

# Check if a package name was provided
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <package-name>"
  exit 1
fi

PACKAGE_NAME="$1"
FILE_NAME=$(echo "$PACKAGE_NAME" | sed 's/\//--/g')

# Fetch the data for the given package name
curl "https://api.npmjs.org/downloads/range/2022-10-05:2023-10-04/${PACKAGE_NAME}" >"${FILE_NAME}.json"

echo "Data for ${PACKAGE_NAME} has been saved to ${FILE_NAME}.json"
