'use strict'
const { Blueprint } = require('./index')

module.exports = function(app) {
    const { router, controller, middleware } = app
    Blueprint(app)
    router.get('/', controller.users.get)
}
