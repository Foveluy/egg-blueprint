const { readdirSync } = require('fs')
const path = require('path')
const bp = require('./index')
const assert = require('assert')

const methods = ['get', 'post', 'patch', 'del', 'options', 'put']

class Blueprint {
    constructor() {
        this.router = {}
        this._prefix = {}
        this.restfulClass = this.restfulClass.bind(this)
        this.setRouter = this.setRouter.bind(this)
        this.getRoute = this.getRoute.bind(this)
    }

    scanController() {
        const dir = path.resolve()
        readdirSync(dir + '/app/controller').forEach(file => {
            require(dir + '/app/controller/' + file)
        })
    }

    setRouter(urls, blueprint) {
        const prefixUrl = this._prefix[blueprint.ClassName]
        const url = prefixUrl ? prefixUrl + urls : urls

        const _bp = this.router[url]
        if (_bp) {
            //check method if existed
            for (const index in _bp) {
                const object = _bp[index]
                if (object.httpMethod === blueprint.httpMethod) {
                    throw new Error(
                        `URL * ${object.httpMethod.toUpperCase()} ${url} * existed`
                    )
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
    restfulClass(url, fn) {
        return Class => {
            ;['Get', 'Post', 'Del', 'Put'].forEach(httpMethod => {
                const lowercase = httpMethod.toLowerCase()
                const handler = Class.prototype[httpMethod]
                this.setRouter(url, {
                    httpMethod: lowercase,
                    constructor: Class,
                    handler: httpMethod,
                    beforeFunction: fn
                })
            })
        }
    }
    getRoute() {
        // this.scanController()
        return this.router
    }

    prefix(url, controllerName) {
        this._prefix[controllerName] = url
    }
}

methods.forEach(httpMethod => {
    Object.defineProperty(Blueprint.prototype, httpMethod, {
        get: function() {
            return (url, fn) => {
                return (target, propertyKey) => {
                    this.setRouter(url, {
                        httpMethod: httpMethod,
                        constructor: target.constructor,
                        handler: propertyKey,
                        beforeFunction: fn,
                        ClassName: target.constructor.name
                    })
                }
            }
        }
    })
})
const bpInstance = new Blueprint()

exports.Blueprint = (app, options) => {
    const { router } = app
    if (options && options.prefix) {
        router.prefix(options.prefix)
    }
    const r = bpInstance.getRoute()
    Object.keys(r).forEach(url => {
        r[url].forEach(object => {
            console.log(url, '--->', object.httpMethod)
            router[object.httpMethod](url, async ctx => {
                // create a new Controller
                const instance = new object.constructor(ctx)
                //run beforeFunction
                const beforeRes =
                    object.beforeFunction &&
                    (await object.beforeFunction(ctx, instance))
                if (beforeRes === false) return

                await instance[object.handler](ctx.request.body)
            })
        })
    })
}

exports.bp = bpInstance
