'use strict';

const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require('path');
const { fsExists } = require('../util');
const { projectInstall } = require('pkg-install');
const execa = require('execa');
const listr = require('listr');
const ncp = require('ncp');
const { promisify } = require('util');
const copy = promisify(ncp);
const fs = require('fs');
const defaultTemplate = 'typescript';
const defaultPort = 7001;

exports.register = (program) => {
  program
    .command('init')
    .alias('i')
    .description('Init a new bff-service')
    .option('-y, --yes', 'ignore inquire，use default template')
    .action((name, options, command) => {
      /*if (options.y || option.yes) {
        // use defaultTemplate
        return {
          ...options,
          template: options.template || defaultTemplate,
        };
      }*/
      let questions = [
        /*{
          name: 'conf',
          type: 'confirm',
          message: chalk.green('Do you want to create a new bff service?'),
          when: (res) => Boolean(res.conf),
        },*/
        {
          type: 'input',
          name: 'serviceName',
          message: chalk.green('Please enter service name'),
          validate: async (val) => {
            return !!val
          },
        },
        {
          type:'list',
          message:function(answers){
            return chalk.red(`❗️ Directory ${answers.serviceName} already exists! Are you sure you want to continue?`);
          },
          choices:['continue','cancel'],
          name:'serviceNameConfirm',
          when:async function(answers){
            const targetFolder = path.join(process.cwd(),  answers.serviceName);
            return fsExists(targetFolder);
          },
          filter: (val) => {
            if (val == 'cancel') {
              process.exit(0);
            }
          },
        },
        {
          type: 'input',
          name: 'author',
          message: chalk.green('Please enter the author'),
        },
        {
          type: 'input',
          message: chalk.green('Please enter the port number'),
          name: 'port',
          validate: (val) => {
            if (Number.parseInt(val) <= 1000) {
              return chalk.red(`The port number must be greater than 1000`);
            }
            return true;
          },
          default: defaultPort,
        },
        {
          type: 'input',
          name: 'version',
          message: chalk.green('Please enter the version number'),
        },
        {
          type: 'input',
          name: 'description',
          message: chalk.green('Please enter the service description'),
        },
        {
          type: 'list',
          message: chalk.green('Please choose which project template to use？'),
          name: 'template',
          choices: ['typescript','javascript'],
          filter: function (val) {
            return val.toLowerCase();
          },
        },
        {
          type: 'confirm',
          name: 'git',
          message: chalk.green('Initialize a git repository?'),
        },
        {
          type: 'confirm',
          name: 'install',
          message: chalk.green('Whether to install dependencies？'),
        },
      ];
      console.log(chalk.green('🐨🐨🐨 ' + 'Welcome to create-bff-service cli,easy to build bff-service～🎉🎉🎉'));
      inquirer.prompt(questions).then((answers) => {
        generatorProject(answers);
      });
    });
};

async function generatorProject(answers) {
  const targetDirectory = path.join(process.cwd(), answers.template);
  // template whether isExists
  const currentFileUrl = import.meta.url;
  const templateDirectory = path.resolve(
    new URL(currentFileUrl).pathname,
    `../../../templates/`,
    answers.template.toLowerCase()
  );
  answers.targetDirectory = targetDirectory;
  answers.templateDirectory = templateDirectory;
  const isfsExists = await fsExists(templateDirectory);
  if (!isfsExists) {
    console.error('template not exists', chalk.red.bold('ERROR'));
    process.exit(1);
  }
  const tasks = [
    {
      title: 'Copy project template',
      task: async (ctx) => {
        const templateTargetDirectory = await copyTemplate(answers);
        ctx.templateTargetDirectory = templateTargetDirectory;
      },
    },
    {
      title: 'Initialize git',
      task: (ctx) => initGit(ctx.templateTargetDirectory),
      enabled: () => answers.git,
    },
    {
      title: 'Install dependencies',
      task: (ctx) => initInstall(ctx.templateTargetDirectory),
      enabled: () => answers.install,
    },
  ];
  const listrInstance = new listr(tasks);
  await listrInstance.run();
  console.log(chalk.green.bold('bff-service init completed'));
  process.exit(0);
}

async function initGit(targetFolder) {
  try {
    // Whether to install git
    const gitInstallResult = await execa('git', ['--version'], {
      cwd: targetFolder,
    });
    // exeaca return
    /*
    {
      command: 'git --version',
      escapedCommand: 'git --version',
      exitCode: 0,
      stdout: 'git version 2.18.0',
      stderr: '',
      all: undefined,
      failed: false,
      timedOut: false,
      isCanceled: false,
      killed: false
    }
    */
    console.log(chalk.green('🐨🐨🐨 ' + 'Welcome to create-bff-service cli,easy to build bff-service～🎉🎉🎉'));
    if (gitInstallResult.failed) {
      return Promise.reject(new Error('Please install git '));
    }
    // git init
    const result = await execa('git', ['init'], {
      cwd: targetFolder,
    });
    if (result.failed) {
      return Promise.reject(new Error('Failed to initialize git'));
    }
  } catch (error) {
    console.log('Failed to initialize git', chalk.red.bold('ERROR'));
    return Promise.reject(new Error('Failed to initialize git'));
  }
  return;
}

async function initInstall(targetFolder) {
  // Check if yarn or NPM is installed
  // Be aware of the NRM source your company uses
  const { stdout } = await projectInstall({
    prefer: 'yarn',
    cwd: targetFolder,
  });
  console.log(chalk.green(`install 完成，进程信息 ${stdout}`))
}

async function copyTemplate(answers) {
  const targetDirectory = path.join(process.cwd(), answers.serviceName);
  let isExist = await fsExists(targetDirectory);
  if (isExist) {
    console.log(chalk.red(`❗️Directory [${answers.serviceName}]already exists`));
    return;
  }
  const source = answers.templateDirectory;
  const target = targetDirectory;
  // copy template --> target
  await copy(source, target, {
    clobber: false,
  });
  await revisePackageJson(answers, target);
  return target;
}

/**
 * replace package.json
 * @param {*} answer
 * @param {*} templatePath
 */
async function revisePackageJson(answers, targetDirectory) {
  // read package.json
  const data = fs.readFileSync(`${targetDirectory}/package.json`);
  const { port = defaultPort, serviceName, author, version, description } = answers;
  let packageJson = data.toString();
  packageJson = serviceName ? packageJson.replace(/bff-service/g, serviceName.trim()) : packageJson;
  packageJson = author ? packageJson.replace(/small_koala/g, author.trim()) : packageJson;
  packageJson = version ? packageJson.replace(/0.0.0/g, version.trim()) : packageJson;
  packageJson = port ? packageJson.replace(/portValue/g, port) : packageJson;
  packageJson = description ? packageJson.replace(/descriptionValue/g, description.trim()) : packageJson;
  // 写入文件 
  await fs.writeFileSync(`${targetDirectory}/package.json`,packageJson)
}
