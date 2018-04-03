# egg-blueprint

Routing decorator for eggjs

# Usage

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


