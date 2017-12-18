// 管理所有的环境的变量和URL
let env = {
  dev: {
    db: {
      username: 'root',
      password: '930102@my',
      host: '10.95.178.158',
      port: 3306
    },
  },
  online: {
    db: {
      username: '',
      password: '',
      host: '',
      port: 000
    }
  }
};

let cfg = null;

if (process.env.NODE_ENV == 'production') {
  cfg = env.online;
  console.log('线上环境');
} else {
  cfg = env.dev;
  console.log('测试环境');
}

module.exports = cfg;
