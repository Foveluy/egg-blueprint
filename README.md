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



### For isntall
```bash
npm install --save  egg-blueprint
```

### setup
In `router.ts`

```ts
//router.ts
import { Application } from 'egg'
import { Blueprint } from 'egg-blueprint'

export default (app: Application) => {
    Blueprint(app)
}

```

### for prefix url
```js
//router.ts
Blueprint(app,{prefix:'/api'})

//controller.ts
export default class index extends Controller {
    @bp.route.get('/user') //===>>/api/user
    async get() {
        this.ctx.body = 'hello,egg-blueprint'
    }
}

```


### start routing

```js
import { bp } from 'egg-blueprint'

export default class index extends Controller {
    @bp.route.get('/')
    async get() {
        this.ctx.body = 'hello,egg-blueprint'
    }

    @bp.route.post('/')
    async post() {
        this.ctx.body = 'hello,post,egg-blueprint'
    }
    .....
}
```

### adding parmas

```js
  @bp.get('/foo/:bar')
    async getWithID() {
        console.log(this.ctx.params)
        this.ctx.body = this.ctx.params['bar']
    }
```



### Quick CRUD

```js
import { bp } from 'egg-blueprint'

bp.restfulClass('blueprint')
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

