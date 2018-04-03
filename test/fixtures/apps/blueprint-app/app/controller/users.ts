'use strict'

const Controller = require('egg').Controller
const { bp } = require('../index')

class User extends Controller {
    @bp.get('/')
    async get() {
        this.ctx.body = 'user get'
    }

    async post() {
        this.ctx.body = 'admin post'
    }
}

module.exports = User
