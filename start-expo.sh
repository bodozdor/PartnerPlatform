#!/bin/bash
# Custom script to start Expo with specific port
# Use localhost instead of custom IP
export EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
export REACT_NATIVE_PACKAGER_HOSTNAME=localhost
npx expo start --port 8081 --localhost