const moment = require('moment');
const webposVersion = require('../model/webposVersion')
// 用户参考：https://sequelize.org/v5/manual/models-usage.html
const Op = require('sequelize').Op

const listAll = async (ctx) => {
  console.log(ctx.query)
  const data = await webposVersion.findAll()
  ctx.body = {
    code: 200,
    data
  }
}
const list = async (ctx) => {
  console.log(ctx.query)
  const query = ctx.query

  const where = {
    version: {
      [Op.like]: `%${query.version}%`
    }
  }
  const pageSize = query.pageSize || 10,
        pageNo = query.pageNo || 1;
  const {rows:data, count: total } = await webposVersion.findAndCountAll({
    where,
    offset: (+pageNo - 1) * +pageSize,
    limit: +pageSize,
    order: [
      ['uploadTime', 'DESC']
    ]
  })
  ctx.body = {
    data,
    total,
    code: 200,
    desc: 'success'
  }
}
const create = async (ctx) => {
  console.log('request', ctx.request);
  const params = ctx.request.body
  console.log(params)
  if (!params.version) {
    ctx.body = {
      code: 1003,
      desc: '版本号不能为空'
    }
    return false
  }
  try {
    await webposVersion.create(params)
    ctx.body = {
      code: 200,
      data: '创建成功'
    }
  }
  catch(err) {
    const msg = err.errors[0]
    ctx.body = {
      code: 300,
      data: msg.value + msg.message
    }
  }
}
const destroy = async ctx => {
  const params = ctx.request.body
  console.log(params)
  await webposVersion.destroy({where: params})
  ctx.body = {
    code: 200,
    desc: '删除成功'
  }
}

const update = async ctx => {
  const params = ctx.request.body
  params.statusTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  console.log(params)
  await webposVersion.update(params, 
  {where: {
    version: params.version
  }})
  ctx.body = {
    code: 200,
    desc: '更新成功',
    data: params
  }
}
module.exports = {
  list,
  create,
  listAll,
  update,
  destroy
}

