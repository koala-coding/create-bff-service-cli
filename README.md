## create-bff-service-cli

## 介绍

**快速搭建一个基于 `egg`框架 的 `bff-service` `cli`工具。**

- 服务模版多种语言可选模 `typescript/javascript` （建议选择 `typescript`，目前只添加了`typescript` 模版）
- 模版内容支持根据交互动态配置，具体可配置内容请看下文参数说明
- 服务模版编码规范已完善，已添加 `eslint`、`prettier`、`tsconfig` 配置等，并且支持自动保存校验，`.vscode` 中 `settings.json` 已配置 。
- 提供了基本项目结构 `router`、`controller`、`service`、`config` 配置等，可直接测试`template`中提供的基础接口。

## 快速开始

### 使用前的准备工作

1. 安装 `node.js`

   `node.js`安装可以官网下载安装，https://nodejs.org/

   也可以使用 `nvs`安装，方便切换版本，https://github.com/jasongin/nvs

2. 安装 `yarn`
   ```
   > npm install -g yarn
   ```
3. 安装 `nrm`
   `nrm` 作用是修改 `npm` 的镜像源
   安装 `nrm`
   ```shell
   > npm install -g nrm
   ```
   设置 `npm` 源为私服地址:
   ```shell
   > nrm add me http://*.*.*.*:78900
   > nrm use me
   ```
4. 建议 IDE
   `vscode`

5. `vscode`必装插件
   `ESLint`

   `Prettier - Code formatter`

   通过这两个插件，配合项目中的规则配置文件，可以使团队中的代码格式化规则一致

### 安装 create-bff-service-cli

```shell
> npm install -g create-bff-service-cli
```

安装之后就可以使用 `cli` 命令： `create-bff-service`

### cli 执行命令说明

#### 在命令行执行命令

```shell
create-bff-service init
```

然后会出现交互提示，按照交互提示输入各项参数。

##### 参数项说明

1. 服务名称 `serviceName`: 服务的英文名称，例如： xxx-bff-service
2. 作者 `author`: 作者的英文名称，例如：xiaoming
3. 服务端口号 `port`: 找运维申请的服务端口号，例如：7001
4. 版本号 `version`: 服务的版本号，例如：0.0.1
5. 介绍 `description`: 服务的介绍 例如：某业务线的 BFF 服务
6. 模版 `template`: 选择模版 例如：选择 typescript 模版
7. 项目版本管理 `git`: 选择是否 git 初始化项目 例如: yes git 初始化项目
8. 项目依赖安装 `install`: 选择是否安装依赖 例如: yes install 所有依赖

##### 使用调试模式启动 `cli` 创建的 `bff-service`

```shell
> yarn debug
```

##### 模版接口测试


接口访问测试：调用 `demo/demo1` 路由，获取服务返回数据。

```shell
curl http://127.0.0.1:7890/demo/demo1

// 返回结果
{"status":200,"data":{"r":"hello word"}}    
```

##### 模版代码保存自动格式化配置
该功能正常使用前提需要安装前文提到的 `vscode` 插件