const add = (x, y=1) => x + y 
const square = z => z * z
const compose = (...[first,...other]) => (...args) => {
  let ret = first(...args) 
  other.forEach(fn => { 
    ret = fn(ret) 
  }) 
  return ret 
} 
const fn = compose(add,square,add) 
console.log(fn(1, 2)) 