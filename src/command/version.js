const pkg = require('../../package.json');
exports.register = function (program) {
  program.version(pkg.version, '-v', '--version');
  return program;
};
