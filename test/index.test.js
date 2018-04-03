const assert = require('assert')
const mock = require('egg-mock')
const request = require('supertest')

describe('egg-di', () => {
    let app
    before(() => {
        app = mock.app({
            baseDir: 'apps/blueprint-app'
        })
        return app.ready()
    })

    beforeEach(() => app.mockCsrf())
    after(() => app.close())
    afterEach(mock.restore)

    it('should GET /', () => {
        return app
            .httpRequest()
            .get('/')
            .expect('user get')
            .expect(200)
    })
})
