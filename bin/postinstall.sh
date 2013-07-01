#!/bin/bash

DOCPAD_ROOT="../../"
CONFIG_SRC=dce-config.js
CONFIG_DEST=${DOCPAD_ROOT}dce-config.js

# Places the DCE config file in the DocPad site root
mv $CONFIG_SRC $CONFIG_DEST