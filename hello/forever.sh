#!/bin/bash
sudo ln -s "$(which nodejs)" /usr/local/bin/node
forever start main.js
