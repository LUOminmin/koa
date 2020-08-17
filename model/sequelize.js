const Sequelize = require('sequelize')
const config = require('../config/index')

// sequelize用法：https://sequelize.org/v5/manual/getting-started.html
const sequelize = new Sequelize(config.db, config.username, config.password, {
	host: config.host,
	dialect: 'mysql',
	operatorsAliases: false,
  	pool: {
    	max: 5,
    	min: 0,
    	acquire: 30000,
    	idle: 10000
  	},
  	// 解决时间不一致问题，参考https://www.cnblogs.com/ybleeho/p/8352482.html
  	timezone: '+08:00'
})

sequelize
	.authenticate()
	.then(() => {
		console.log('MYSQL 连接成功......');
	})
	.catch(err => {
		console.error('链接失败:', err);
	});

// 根据模型自动创建表
sequelize.sync()

module.exports = sequelize