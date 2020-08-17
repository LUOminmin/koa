const local = {
  /** 阿里云oss */
    region: 'oss-cn-shenzhen',
    accessKeyId: 'LTAI4Fg7bcm1pQ56S6rFpUc3',
    accessKeySecret: 'R6p83V3cM1rVhjksRknu1Wrhe1lmKg',
    bucket: 'qqbibipos',

    /** db */
    db: 'fx',
    username: 'root',
    password: '123456',
    host: '127.0.0.1',
    dburl:'mysql://127.0.0.1:3306'

}


const dev = {
	/** 阿里云oss */
	region: 'oss-cn-shenzhen',
  	accessKeyId: 'LTAI4Fg7bcm1pQ56S6rFpUc3',
  	accessKeySecret: 'R6p83V3cM1rVhjksRknu1Wrhe1lmKg',
  	bucket: 'qqbibipos',

  	/** db */
  	db: 'fx',
  	username: 'root',
  	password: 'mysql!@#root',
  	host: '192.168.10.3',
  	dburl:'mysql://192.168.10.3:3306'

}

const config = dev;

module.exports = config;