#!/usr/bin/env node

'use strict';
require = require('esm')(module /*, options*/);
const checkUpdate = require('../src/checkUpdate');
// checkUpdate();

const commands = require('../src/command/index');
const program = require('commander');
commands.register(program);

program.parse(process.argv);
