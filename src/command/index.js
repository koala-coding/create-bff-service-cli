'use strict';
const commandList = [
  require('./init'), // init create bff-service
  require('./version'), // get version
  require('./run'), // run bff-service
];
exports.register = (program) => {
  commandList.forEach((command) => {
    command.register(program);
  });
};
