import { Application } from 'egg'
import { Blueprint } from '../lib'

export default (app: Application) => {
    Blueprint(app, { prefix: '/api' })
}
