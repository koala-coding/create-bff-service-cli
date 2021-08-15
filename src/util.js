'use strict';
const fs = require('fs');
const { promisify } = require('util');
const access = promisify(fs.access);
exports.fsExists = async function (target) {
  let isExist = false;
  try {
    await access(target, fs.constants.R_OK);
    isExist = true;
  } catch (error) {
    isExist = false;
  }
  return isExist;
};
