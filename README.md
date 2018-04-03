# egg-blueprint

Routing decorator for eggjs

# Usage

### setup

For isntall
```
npm install --save  egg-blueprint
``


In `router.ts`

```ts
//router.ts
import { Application } from 'egg'
import { Blueprint } from 'egg-blueprint'

export default (app: Application) => {
    Blueprint(app)
}

```

for prefix url
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

