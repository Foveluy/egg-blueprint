'use strict'

import { app } from 'egg-mock/bootstrap'

const strBody = (obj: any) => {
    return JSON.stringify(obj)
}

describe('test/app/controller/test.test.ts', () => {
    it('should CRUD for test.ts', async () => {
        app.mockCsrf()
        await app
            .httpRequest()
            .get('/api/get')
            .expect('bp get')
            .expect(200)

        await app
            .httpRequest()
            .post('/api/post')
            .expect(strBody({ foo: 'bar' }))
            .expect(200)

        await app
            .httpRequest()
            .put('/api/put')
            .expect(strBody({ poo: 'par' }))
            .expect(200)

        await app
            .httpRequest()
            .del('/api/del')
            .expect(strBody({ del: 'dels' }))
            .expect(200)
    })

    it('url params for test.ts', async () => {
        await app
            .httpRequest()
            .get('/api/foo/bar')
            .expect('bar')
            .expect(200)
    })

    it('auth (function run before target function)', async () => {
        await app
            .httpRequest()
            .get('/api/need/auth/1234')
            .expect('authed')
            .expect(200)

        await app
            .httpRequest()
            .get('/api/need/auth/(!*&(*')
            .expect('can not see')
            .expect(200)
    })
})
