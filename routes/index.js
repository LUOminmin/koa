const router = require('koa-router')()
const webposVersion = require('../controller/WebposVersion');

// version
router.get('/version/list', webposVersion.list)
router.get('/version/list/all', webposVersion.listAll)
router.post('/version/create', webposVersion.create)
router.post('/version/update', webposVersion.update)
router.post('/version/destroy', webposVersion.destroy)




router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
