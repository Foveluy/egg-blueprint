import { Controller } from 'egg'
import { bp } from '../../lib'

@bp.restfulClass('/rest')
export default class RestController extends Controller {
    async Get() {
        const { ctx } = this
        ctx.body = 'bp get'
    }

    async Post() {
        this.ctx.body = JSON.stringify({ foo: 'bar' })
        this.ctx.set('Content-type', 'application/json')
    }

    async Put() {
        this.ctx.body = JSON.stringify({ poo: 'par' })
        this.ctx.set('Content-type', 'application/json')
    }


    async Del() {
        this.ctx.body = JSON.stringify({ del: 'dels' })
        this.ctx.set('Content-type', 'application/json')
    }
}
