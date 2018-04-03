'use strict'

import { app } from 'egg-mock/bootstrap'

const strBody = (obj: any) => {
    return JSON.stringify(obj)
}

describe('test/app/controller/rest.test.ts', () => {
    it('should CRUD class controller for rest.ts', async () => {
        app.mockCsrf()
        const url = '/api/rest'
        await app
            .httpRequest()
            .get(url)
            .expect('bp get')
            .expect(200)

        await app
            .httpRequest()
            .post(url)
            .expect(strBody({ foo: 'bar' }))
            .expect(200)

        await app
            .httpRequest()
            .put(url)
            .expect(strBody({ poo: 'par' }))
            .expect(200)

        await app
            .httpRequest()
            .del(url)
            .expect(strBody({ del: 'dels' }))
            .expect(200)
    })
})
