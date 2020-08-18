const compose = (middlewares) => {
  console.log(middlewares)
    return function(ctx, next) {
        dispatch(0)
        function dispatch(i) {
            let fn = middlewares[i]
            if (i === middlewares.length) fn = next;
            if(!fn) return Promise.resolve()
            return Promise.resolve(fn(ctx, dispatch.bind(null, i+1)))
        }
    }
}


const add = (x, y) => x + y 
const square = z => z * z
const composeSync = (...[first,...other]) => (...args) => {
  let ret = first(...args) 
  other.forEach(fn => { 
    ret = fn(ret) 
  }) 
  return ret 
} 
const fn = composeSync(add,square) 
console.log(fn(1, 2)) 

const composes = [];

function use(fun) {
  composes.push(fun);
}

use(async (ctx, next) => {
  console.log('第一个中间件');
  await next();
  console.log('1->END');
});

use(async (ctx, next) => {
  console.log('第二个中间件');
  await next();
  console.log('2->END');
});

use(async (ctx, next) => {
  console.log('第三个中间件');
  await next();
  console.log('3->END');
});

const exec = compose(composes);

(async () => {
  const ctx = {};
  await exec(ctx, async () => {
    console.log('END');
  });
})();

module.exports = compose