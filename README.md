# egg-blueprint
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![David deps][david-image]][david-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-blueprint.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-blueprint
[travis-image]: https://img.shields.io/travis/215566435/egg-blueprint.svg?style=flat-square
[travis-url]: https://travis-ci.org/215566435/egg-blueprint
[coveralls-image]: https://img.shields.io/coveralls/215566435/egg-blueprint.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/215566435/egg-blueprint?branch=master
[david-image]: https://img.shields.io/david/215566435/egg-blueprint.svg?style=flat-square
[david-url]: https://david-dm.org/215566435/egg-blueprint
[node-image]: https://img.shields.io/badge/node.js-%3E=_8.0-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/egg-blueprint.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-blueprint

Routing decorator for eggjs

# Usage



### For Install
```bash
npm install --save  egg-blueprint
```

### Setup
In `router.ts`

```ts
//router.ts
import { Application } from 'egg'
import { Blueprint } from 'egg-blueprint'

export default (app: Application) => {
    Blueprint(app)
}

```

# Prefix Url Globally
```js
//router.ts
Blueprint(app,{prefix:'/api'})

//controller.ts
export default class index extends Controller {
    @bp.get('/user') //===>>/api/user
    async get() {
        this.ctx.body = 'hello,egg-blueprint'
    }
}

```

# Prefix Url For Controller
```js

//controller.ts

bp.prefix('/prefixtest', 'index')
export default class index extends Controller {
    @bp.get('/user') //===>>/prefixtest/user
    async get() {
        this.ctx.body = 'hello,egg-blueprint'
    }
}

```

***NOTICE 1***: ```bp.prefix``` is not a decorator function. The first argument is prefix url, the second is ***the class name of this controller.

***NOTICE 2***: If you have already setup a global ```prefix option```,controller prefix function will do the next:

```js
//router.ts
Blueprint(app,{prefix:'/api'})

//controller.ts
bp.prefix('/prefixtest', 'index')
export default class index extends Controller {
    @bp.get('/user') //===>>/api/prefixtest/user
    async get() {
        this.ctx.body = 'hello,egg-blueprint'
    }
}

```




# Start Routing

```js
import { bp } from 'egg-blueprint'

export default class index extends Controller {
    @bp.get('/')
    async get() {
        this.ctx.body = 'hello,egg-blueprint'
    }

    @bp.post('/')
    async post() {
        this.ctx.body = 'hello,post,egg-blueprint'
    }
    .....
}
```

# Adding Parmas

```js
  @bp.get('/foo/:bar')
    async getWithID() {
        console.log(this.ctx.params)
        this.ctx.body = this.ctx.params['bar']
    }
```

# Router Middleware

Router middleware will run before the target function.

***Example***

```ts
const Auth = (ctx: Context,ctl: Controller) => {
    if (ctx.params['password'] === '1234') return true
    ctx.body = 'can not see'
    return false
}


// some-controller.ts
export default class TestController extends Controller {
   @bp.get('/need/auth/:password', Auth)
    async needAuth() {
        const { ctx } = this
        ctx.body = 'authed'
    }
}
```

- middleware Params: ```Ctx:Context``` and ```ctl: Controller```, in this case, ```ctl``` is ```TestController```,not the original ```Controller```
- if middleware returns ```false```,the target function will not run, only ```false``` can stop the whole middleware stack. the target function will continue if returns ```true``` or ```undefined```.




# Quick CRUD

```js
import { bp } from 'egg-blueprint'

@bp.restfulClass('blueprint')
export default class Index extends Controller {
    async Get() {
        this.ctx.body = 'hello,egg-blueprint'
    }

    async Post() {
        this.ctx.body = 'hello,post,egg-blueprint'
    }

    async Put() {
        this.ctx.body = 'hello,egg-blueprint'
    }

    async Del() {
        this.ctx.body = 'hello,egg-blueprint'
    }
}
```

The MIT License (MIT)

Copyright (c) ZhengFang <snakegear@163.com> 

