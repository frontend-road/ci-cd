const shell = require('shelljs');
const Rsync = require('rsync');
const path = require('path');
const colors = require('colors');
const argv = require('yargs').argv;

console.log(argv);

const [
  targetName
] = argv._;

const host_map = {
  staging001: 'root@111.229.81.101:/root/docs'
};

if (!host_map[targetName]) {
  shell.echo(colors.red('目标主机不存在'));
  shell.exit(1);
}

function sendNotify(message) {
  // 企业微信
  shelljs.exec(`curl 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=dbb3fa53-29f8-4394-bfa1-ecce009e8cbb' -H 'Content-Type: application/json' -d '{"msgtype": "text", "text": {"content": "${message}"}}'`);
}

// 安装依赖
console.log(colors.yellow('🐛 安装依赖'));
// sendNotify('安装依赖');
if (shell.exec('npm i').code !== 0) {
  shell.echo('Error: npm i failed');
  shell.exit(2);
}

// 测试
console.log(colors.yellow('🐛 开始测试'));
// sendNotify('开始测试');
if (shell.exec('npm run test').code !== 0) {
  shell.echo('Error: npm run test failed');
  shell.exit(3);
}

// 构建
console.log(colors.yellow('🐛 开始构建'));
// sendNotify('开始构建');
if (shell.exec('npm run build').code !== 0) {
  shell.echo('Error: npm run build failed');
  shell.exit(4);
}

// 部署
console.log(colors.yellow('🐛 开始部署'));
var rsync = Rsync.build({
  source:      path.join(__dirname, '..', '.vuepress/dist/*'),
  destination: host_map[targetName],
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
  // sendNotify('构建完成');
});
