const shell = require('shelljs');
const Rsync = require('rsync');
const path = require('path');
const colors = require('colors');
const argv = require('yargs').argv;

console.log(argv);

// 安装依赖
console.log(colors.yellow('🐛 安装依赖'));
if (shell.exec('npm i').code !== 0) {
  shell.echo('Error: npm i failed');
  shell.exit(1);
}

// 测试
console.log(colors.yellow('🐛 开始测试'));
if (shell.exec('npm run test').code !== 0) {
  shell.echo('Error: npm run test failed');
  shell.exit(1);
}

// 构建
console.log(colors.yellow('🐛 开始构建'));
if (shell.exec('npm run build').code !== 0) {
  shell.echo('Error: npm run build failed');
  shell.exit(1);
}

// 部署
console.log(colors.yellow('🐛 开始部署'));
var rsync = Rsync.build({
  source:      path.join(__dirname, '..', '.vuepress/dist/*'),
  destination: 'root@111.229.81.101:/root/docs',
  // exclude:     ['.git'],
  flags:       'avz',
  shell:       'ssh'
});

// rsync.execute(function(error, stdout, stderr) {
//   // we're done
// });

rsync.execute(function(error, code, cmd) {
  // we're done
  console.log(error, code, cmd);
  console.log(colors.green('🚀 构建完成'));
});
