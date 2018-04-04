import { Controller } from 'egg'
import { bp } from '../../lib'
import { Context } from 'koa'

const Auth = (ctx: Context) => {
    if (ctx.params['password'] === '1234') return true
    ctx.body = 'can not see'
    return false
}

export default class TestController extends Controller {
    @bp.get('/get')
    public async index() {
        const { ctx } = this
        ctx.body = 'bp get'
    }

    @bp.post('/post')
    async post() {
        this.ctx.body = JSON.stringify({ foo: 'bar' })
        this.ctx.set('Content-type', 'application/json')
    }

    @bp.put('/put')
    async put() {
        this.ctx.body = JSON.stringify({ poo: 'par' })
        this.ctx.set('Content-type', 'application/json')
    }

    @bp.del('/del')
    async del() {
        this.ctx.body = JSON.stringify({ del: 'dels' })
        this.ctx.set('Content-type', 'application/json')
    }
    @bp.get('/foo/:bar')
    async getWithID() {
        console.log(this.ctx.params)
        this.ctx.body = this.ctx.params['bar']
    }

    @bp.get('/need/auth/:password', Auth)
    async needAuth() {
        const { ctx } = this
        ctx.body = 'authed'
    }
}
