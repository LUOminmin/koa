const sequelize = require('./sequelize');
const Sequelize = require('sequelize');
const moment = require('moment');
// 定义表结构
const webposVersion = sequelize.define('webpos_version', {
		versionId: {
			type: Sequelize.INTEGER, // 设置字段类型
			primaryKey: true,
			autoIncrement: true,
			field: 'version_id',
		},
		version: {
		    type: Sequelize.STRING,
		    
		},
		content: {
		    type: Sequelize.STRING
		},
		url: {
		    type: Sequelize.STRING
		},
		creator: {
		    type: Sequelize.INTEGER
		},
		operator: {
		    type: Sequelize.INTEGER
		},
		status: {
		    type: Sequelize.STRING
		},
		statusTime: {
		    type: Sequelize.DATE,
		    defaultValue: Sequelize.NOW,
		    field: 'status_time', // Will result in an attribute that is firstName when user facing but first_name in the database
		    get() {
		      // this.getDataValue 获取当前字段value
		      return moment(this.getDataValue('statusTime')).format('YYYY-MM-DD HH:mm:ss')
		    }
		},
		
		uploadTime: {
		    type: Sequelize.DATE,
		    // defaultValue: Sequelize.NOW,
		    field: 'upload_time', // Will result in an attribute that is firstName when user facing but first_name in the database
		    get() {
		      // this.getDataValue 获取当前字段value
		      return moment(this.getDataValue('uploadTime')).format('YYYY-MM-DD HH:mm:ss')
		    }
		},
		updateTime: {
		    type: Sequelize.DATE,
		    // defaultValue: Sequelize.NOW,
		    field: 'update_time', // Will result in an attribute that is firstName when user facing but first_name in the database
		    get() {
		      return moment(this.getDataValue('updateTime')).format('YYYY-MM-DD HH:mm:ss')
		    }
		}
	},
	{
	  // sequelize会自动使用传入的模型名（define的第一个参数）的复数做为表名 设置true取消默认设置
	  freezeTableName: true,
	  // disabling timestamps
	  timestamps: false
	}
)


module.exports = webposVersion