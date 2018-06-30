const path = require('path');
const fs = require('fs');
const program = require('commander');
const pkg = require("./package.json");
const webpackBuild = require("freedom-middleware-webpack2");
const proxyMiddleware = require('http-proxy-middleware');
const app = require("express")();
const colors = require("colors");
const serverStatic = require("serve-static");

const projectName = pkg.name;
const version = pkg.version;
const baseDir = process.cwd();
const basePath = "../services";
let importFiles = [];
const fileLoader = {
  load: function () {
    let files = [
      `${baseDir}/src/scripts/services`
    ];
    files.forEach((file) => {
      let stat = fs.statSync(path.normalize(`${file}`));
      if (stat.isDirectory()) {
        // 如果是文件夹遍历
        this.loadFile(path.normalize(`${file}`));
      } else {
        let regExp = /(.+)\.ts/gi, fileName = "";
        if (regExp.test(file)) {
          fileName = RegExp.$1;
        }
        importFiles.push(`${basePath}/${fileName}`);
      }
    });
  },
  loadFile: function (filePath) {
    let _this = this;
    let files = fs.readdirSync(filePath);
    files.forEach(function (file) {
      let stat = fs.statSync(`${filePath}/${file}`);
      if (stat.isDirectory()) {
        // 如果是文件夹遍历
        _this.loaderFile(`${filePath}/${file}`);
      } else {
        importFiles.push(`${basePath}/${file}`);
      }
    });
  }
};
fileLoader.load();
let commonImportFileContent = fs.readFileSync(`${baseDir}/src/scripts/common/index.js`, "utf-8");
importFiles.forEach((item) => {
  if (commonImportFileContent.indexOf(item) == -1)
    commonImportFileContent += `import "${item}";`;
});
let originImportFileContent = fs.readFileSync(`${baseDir}/src/scripts/common/index.js`, "utf-8");
if (originImportFileContent != commonImportFileContent) {
  fs.writeFileSync(`${baseDir}/src/scripts/common/index.js`, commonImportFileContent, {
    encoding: "utf-8"
  });
}
const params = {
  port: 3333,
  env: "dev",
  publicPath: ``,
  build: `build/bms/${version}`,
  proxy: {
    context: pkg.proxy,
    options: {
      target: "http://www.51qututu.com"
    }
  }
};
program
  .version('0.0.1')
  .option('-d, --dev', '开发环境')
  .option('-b, --build', '编译环境')
  .option('-s, --serve', '编译后运行环境')
  .parse(process.argv);
if (program.dev) {
  dev();
}

if (program.serve) {
  runServe();
}

if (program.build) {
  build(program.build);
}

function dev(argument) {
  (async function () {
    await webpackBuild(params);
  })();
}

function runServe() {
  params.env = "prod";
  params.publicPath = "";
  params.build = "build";
  (async function () {
    await webpackBuild(params);
    var proxy1 = proxyMiddleware(params.proxy.context, {
      target: params.proxy.options.target
    });
    app.use(proxy1);
    app.use(serverStatic(`${baseDir}/${params.build}`, {
      index: [`index.html`]
    }));
    let listenStr = `listen at http://localhost:8888,......`;
    console.log(listenStr.bold.cyan);
    app.listen(8888);
  })();
}


function build(argument) {
  params.env = "prod";
  params.publicPath = `http://www.51qututu.com/bms/${version}/`;
  //params.serverPort = 8888;
  (async function () {
    await webpackBuild(params);
  })();
}
