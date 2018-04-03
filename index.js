const { readdirSync } = require('fs')
const bp = require('./index')

const methods = ['get', 'post', 'patch', 'del', 'options', 'put']

class Blueprint {
    constructor() {
        this.router = {}
        this._prefix = ''
        this.restfulClass = this.restfulClass.bind(this)
        this.setRouter = this.setRouter.bind(this)
        this.getRoute = this.getRoute.bind(this)
    }

    setPrefix(prefix) {
        this._prefix = prefix
    }

    scanController() {
        const dir = __dirname.replace('app/egg-blueprint', '')
        readdirSync(dir + 'app/controller').forEach(file => {
            require(dir + 'app/controller/' + file)
        })
    }

    setRouter(urls, blueprint) {
        const url = this._prefix === '' ? urls : this._prefix + urls
        const _bp = this.router[url]
        if (_bp) {
            //check method if existed
            for (const index in _bp) {
                const object = _bp[index]
                if (object.httpMethod === blueprint.httpMethod) {
                    console.log(
                        `URL * ${object.httpMethod.toUpperCase()} ${url} * existed `
                    )
                    return
                }
            }
            //not existed
            this.router[url].push(blueprint)
        } else {
            this.router[url] = []
            this.router[url].push(blueprint)
        }
    }

    /**
     * crud
     *
     * Get(); => http GET
     *
     * Post(); => http POST
     *
     * Del(); => http DELETE
     *
     * Put(); => http PUT
     * @param url
     */
    restfulClass(url) {
        return Class => {
            ;['Get', 'Post', 'Del', 'Put'].forEach(httpMethod => {
                const lowercase = httpMethod.toLowerCase()
                const handler = Class.prototype[httpMethod]
                if (handler) {
                    this.setRouter(url, {
                        httpMethod: lowercase,
                        constructor: Class,
                        handler: httpMethod
                    })
                }
            })
        }
    }
    getRoute() {
        this.scanController()
        return this.router
    }
}

methods.forEach(httpMethod => {
    Object.defineProperty(Blueprint.prototype, httpMethod, {
        get: function() {
            return url => {
                return (target, propertyKey) => {
                    this.setRouter(url, {
                        httpMethod: httpMethod,
                        constructor: target.constructor,
                        handler: propertyKey
                    })
                }
            }
        }
    })
})
const bpInstance = new Blueprint()

exports.Blueprint = app => {
    const { router } = app
    const r = bpInstance.getRoute()
    Object.keys(r).forEach(url => {
        r[url].forEach(object => {
            router[object.httpMethod](url, async ctx => {
                const instance = new object.constructor(ctx)
                await instance[object.handler](ctx.request.body)
            })
        })
    })
}

exports.bp = bpInstance
